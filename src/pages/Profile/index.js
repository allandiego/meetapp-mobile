import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { updateProfileRequest } from '~/store/Modules/user/actions';
import { signOut } from '~/store/Modules/auth/actions';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Loading from '~/components/Loading';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  LogoutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [old_password, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setPasswordConfirmation('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        old_password,
        password,
        password_confirmation,
      })
    );
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      {!loading ? (
        <Container>
          <Form>
            <FormInput
              placeholder="Seu nome completo"
              icon="person-outline"
              autoCorrect={false}
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />

            <FormInput
              placeholder="Digite seu e-mail"
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              blurOnSubmit={false}
              autoCapitalize="none"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <Separator />

            <FormInput
              placeholder="Sua senha atual"
              icon="lock-outline"
              blurOnSubmit={false}
              secureTextEntry
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={old_password}
              onChangeText={setOldPassword}
            />

            <FormInput
              placeholder="Sua nova senha"
              icon="lock-outline"
              blurOnSubmit={false}
              secureTextEntry
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordConfirmationRef.current.focus()}
              value={password}
              onChangeText={setPassword}
            />

            <FormInput
              placeholder="Confirme sua nova senha"
              icon="lock-outline"
              blurOnSubmit={false}
              secureTextEntry
              ref={passwordConfirmationRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={password_confirmation}
              onChangeText={setPasswordConfirmation}
            />

            <SubmitButton loading={loading} onPress={handleSubmit}>
              Salvar Perfil
            </SubmitButton>

            <LogoutButton loading={loading} onPress={handleLogout}>
              Sair do MeetApp
            </LogoutButton>
          </Form>
        </Container>
      ) : (
        <Loading />
      )}
    </Background>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Profile.navigationOptions = ({ navigation }) => ({
  // title: 'Perfil',
  // header: { visible: false },
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={30} color={tintColor} />
  ),
});
