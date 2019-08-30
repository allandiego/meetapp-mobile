import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getError } from '~/util/errorHandler';
import AlertHelper from '~/components/AlertHelper';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Subscription from '~/components/Subscription';

import { Container, List, NoResultsContainer, NoResultsText } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSubscriptions() {
    try {
      setLoading(true);
      const response = await api.get('subscriptions');
      setSubscriptions(response.data);
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleCancel(subscription_id) {
    try {
      await api.delete(`subscriptions/${subscription_id}`);

      AlertHelper.show('warn', 'Sucesso!', 'Inscrição cancelada com sucesso');
      loadSubscriptions();
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  function renderListEmpty() {
    return (
      <NoResultsContainer>
        <NoResultsText>Nenhuma inscrição disponível</NoResultsText>
      </NoResultsContainer>
    );
  }

  return (
    <Background>
      <Header />
      {!loading && (
        <Container>
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Subscription
                onButtonClick={() => handleCancel(item.id)}
                data={item}
              />
            )}
            refreshing={loading}
            onRefresh={loadSubscriptions}
            ListEmptyComponent={renderListEmpty}
          />
        </Container>
      )}
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={30} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
