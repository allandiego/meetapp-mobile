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
  const [refreshing, setRefreshing] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(selectedPage = 1) {
    try {
      if (selectedPage > 1 && isListEnd) return;

      setLoading(true);
      const response = await api.get('meetups', {
        params: {
          date,
          page: selectedPage,
          per_page: 2,
        },
      });

      const data =
        selectedPage > 1
          ? [...meetups, ...response.data.rows]
          : response.data.rows;

      setIsListEnd(selectedPage >= response.data.total_pages);

      setPage(selectedPage);
      setMeetups(data);
      setLoading(false);
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date]); // eslint-disable-line

  function handlePrevDay() {
    setIsListEnd(false);
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setIsListEnd(false);
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
    if (!loading) return null;
    return <Loading />;
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

        {!loading && (
          <>
            <List
              data={meetups}
              renderItem={renderItem}
              keyExtractor={item => String(item.id)}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onEndReachedThreshold={0.1}
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
