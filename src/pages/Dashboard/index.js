import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get(`meetups?page=${page}`);
      // const teste = response.data;

      // const data = {
      //   ...meetups,
      //   teste,
      // };
      // console.tron.log(data);
      setMeetups(response.data);

      setLoading(false);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, page]);

  async function handleSubscribe(id) {
    console.tron.log(`Inscrito em ${id}`);
    // const response = await api.delete(`appointments/${id}`);
    // setAppointments(
    //   meetups.map(appointment =>
    //     meetup.id === id
    //       ? {
    //           ...meetup,
    //           canceled_at: response.data.canceled_at,
    //         }
    //       : appointment
    //   )
    // );
  }

  return (
    <Background>
      {loading ? (
        <Loading size="large" />
      ) : (
        <Container>
          <Header />
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                onSubscribe={() => handleSubscribe(item.id)}
                data={item}
              />
            )}
            onEndReachedThreshold={0.8} // (item position to load / total itens)
            onEndReached={({ distanceFromEnd }) => {
              // setPage(page + 1);
              console.tron.log(`on end reached ${page}`, distanceFromEnd);
            }}
          />
        </Container>
      )}
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
