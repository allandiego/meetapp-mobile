import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { getError } from '~/util/errorHandler';
import AlertHelper from '~/components/AlertHelper';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Meetup from '~/components/Meetup';

import {
  Container,
  List,
  DateNav,
  DateText,
  NoResultsContainer,
  NoResultsText,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [isListEnd, setIsListEnd] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(selectedPage = 1) {
    // console.tron.log(
    //   `loadMeetups: selectedPage ${selectedPage} - date: ${date} - isListEnd ${isListEnd}`
    // );

    if (selectedPage > 1 && isListEnd) return;

    try {
      const response = await api.get('meetups', {
        params: {
          date,
          page: selectedPage,
        },
      });

      if (response.data.length === 0) {
        setIsListEnd(true);
      }

      const data =
        selectedPage > 1 ? [...meetups, ...response.data] : response.data;

      setPage(selectedPage);
      setMeetups(data);
      setLoading(false);
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      setRefreshing(true);
      loadMeetups();
      setRefreshing(false);
    }
  }, [isFocused, date]); // eslint-disable-line

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleRefresh() {
    setRefreshing(true);
    setIsListEnd(false);
    loadMeetups();
    setRefreshing(false);
  }

  async function handleSubscribe(meetup_id) {
    try {
      await api.post('subscriptions', { meetup_id });

      AlertHelper.show('info', 'Sucesso!', 'Inscrição realizada com sucesso');
      NavigationService.navigate('Subscriptions');
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  function renderItem({ item }) {
    return (
      <Meetup onButtonClick={() => handleSubscribe(item.id)} data={item} />
    );
  }

  function renderListFooter() {
    return loading && <Loading />;
  }

  function renderListEmpty() {
    return (
      <NoResultsContainer>
        <NoResultsText>Nenhum evento disponível</NoResultsText>
      </NoResultsContainer>
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateNav>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </TouchableOpacity>

          <DateText>{dateFormatted}</DateText>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </TouchableOpacity>
        </DateNav>

        {/* {loading && <Loading size="large" />} */}
        {!loading && (
          <>
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={renderItem}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReachedThreshold={0.01}
              onEndReached={() => loadMeetups(page + 1)}
              ListFooterComponent={renderListFooter}
              ListEmptyComponent={renderListEmpty}
            />
          </>
        )}
      </Container>
    </Background>
  );
}

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={30} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
