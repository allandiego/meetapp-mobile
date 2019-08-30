import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { getError } from '~/util/errorHandler';
import AlertHelper from '~/components/AlertHelper';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, NoResultsContainer, NoResultsText } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    async function loadSubscriptions() {
      if (loading) return;

      setLoading(true);
      const response = await api.get('subscriptions', {
        params: {
          page,
        },
      });

      if (response.data.length === 0) {
        setIsListEnd(true);
      }

      const data =
        page !== 1 ? [...subscriptions, ...response.data] : response.data;

      setSubscriptions(data);
      setLoading(false);
    }

    loadSubscriptions();
  }, [loading, page, subscriptions]);

  function handleLoadMore() {
    if (!isListEnd) {
      setPage(page + 1);
    }
  }

  async function handleCancel(meetup_id) {
    try {
      await api.delete('subscriptions', { meetup_id });

      AlertHelper.show(
        'success',
        'Sucesso!',
        'Inscrição cancelada com sucesso'
      );
      NavigationService.navigate('Subscriptions');
    } catch (err) {
      AlertHelper.show('error', 'Erro', getError(err));
    }
  }

  function renderFooter() {
    return loading ? (
      <View>
        <ActivityIndicator />
      </View>
    ) : null;
  }

  return (
    <Background>
      <Header />
      <Container>
        {subscriptions.length > 0 ? (
          <List
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup onButtonClick={() => handleCancel(item.id)} data={item} />
            )}
            onEndReachedThreshold={0.5} // (item position to load / total itens)
            onEndReached={handleLoadMore}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <NoResultsContainer>
            <NoResultsText>Nenhum registro</NoResultsText>
          </NoResultsContainer>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="link" size={30} color={tintColor} />
  ),
};
