import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from "react-switch";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cpfMask, celularMask, telefoneMask, cepMask } from "masks-br";
import jwt_decode from 'jwt-decode';

import api from '../../services/api'
import history from "../../history";

import Logo from '../../assets/PC.png';
import './styles.css';


export default function Register() {
  const [logged, setLogged] = useState(false);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [contato, setContato] = useState({
    telResidencial: '',
    telCelular: '',
    email: ''
  });

  /* Campos do funcionário */
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  /* Campos do hóspede */
  const [premium, setPremium] = useState(false);

  /* Campos do acesso a ser criado */
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmation, setConfirmation] = useState('');

  /* Toggle:
      True  -> Funcionário
      False -> Hóspede 
  */
  const [toggle, setToggle] = useState(false);
  const handleSwitch = () => setToggle(!toggle);
  const handlePremium = () => setPremium(!premium);

  useEffect(() => {
    async function checkLoggedUser() {
      try {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwt_decode(token);

        if (decodedToken.roles === "ROLE_USER") {
          setLogged(3);
        } else if (decodedToken.roles === "ROLE_MOD,ROLE_USER") {
          setLogged(2);
        } else {
          setLogged(1);
        }
      } catch (err) {
        setLogged(false);
      }
    }

    checkLoggedUser();
  }, [])

  async function handleRegister(e) {
    e.preventDefault();

    if (senha === confirmation) {
      const data = {
        nome,
        cpf,
        endereco,
        contato,
        usuario,
        senha
      };

      if (toggle) {
        data.cargo = cargo;
        data.salario = salario;
      } else {
        data.premium = premium;
      }

      await api
        .post(toggle ? "acesso/register?func=1" : "acesso/register", data)
        .then(res => {
          alert('Cadastrado com sucesso');
          history.push('/');
        }).catch(err => {
          alert('Erro no cadastro, tente novamente');
          console.log(err);
        });
    } else {
      alert('As senhas não batem, verifique os campos e tente novamente');
    }
  }

  return (
    <div className="body">
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />

          <div className="switch">
            <span>Cadastrar funcionário </span>
            <Switch onChange={handleSwitch} checked={toggle} />
          </div>

          <ul>
            <li>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="CPF"
                maxLength="14"
                value={cpf}
                onChange={e => setCpf(cpfMask(e.target.value))}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="CEP"
                value={endereco.cep}
                onChange={e => setEndereco({ ...endereco, cep: cepMask(e.target.value) })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Logradouro"
                value={endereco.logradouro}
                onChange={e => setEndereco({ ...endereco, logradouro: e.target.value })}
              />
            </li>

            <li>
              <input
                type="number"
                placeholder="Numero"
                value={endereco.numero}
                onChange={e => setEndereco({ ...endereco, numero: e.target.value })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Bairro"
                value={endereco.bairro}
                onChange={e => setEndereco({ ...endereco, bairro: e.target.value })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Cidade"
                value={endereco.cidade}
                onChange={e => setEndereco({ ...endereco, cidade: e.target.value })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Estado"
                value={endereco.estado}
                onChange={e => setEndereco({ ...endereco, estado: e.target.value })}
              />
            </li>

            <li>
              <input
                type="email"
                placeholder="E-mail"
                value={contato.email}
                onChange={e => setContato({ ...contato, email: e.target.value })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Telefone"
                value={contato.telResidencial}
                onChange={e => setContato({ ...contato, telResidencial: telefoneMask(e.target.value) })}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Celular"
                value={contato.telCelular}
                onChange={e => setContato({ ...contato, telCelular: celularMask(e.target.value) })}
              />
            </li>

            {toggle ?
              <div className="worker-fields">
                <li>
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={cargo}
                    onChange={e => setCargo(e.target.value)}
                    disabled={!toggle}
                  />
                </li>

                <li>
                  <input
                    type="number"
                    placeholder="Salário"
                    value={salario}
                    onChange={e => setSalario(e.target.value)}
                    disabled={!toggle}
                  />
                </li>
              </div>
              :
              <div className="switch-premium">
                <span>Quer ser usuário premium?</span>
                <Switch onChange={handlePremium} checked={premium} />
              </div>}
          </ul>

          <hr />
          {!toggle ? (
            <span>Agora só falta criar seu acesso</span>
          ) : (
            <span>Acesso para o funcionário</span>
          )}

          <ul>
            <input
              type="text"
              placeholder="Nome de usuário"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmation}
              onChange={e => setConfirmation(e.target.value)}
            />
          </ul>

          {toggle ? (
            <button type="submit">Cadastrar Funcionário</button>
          ) : (
            <button type="submit">Cadastrar Hóspede</button>
          )}

          <hr />
          {logged === false ? <Link to="/">Fazer login</Link>
            : logged === 1 || logged === 3 ?
              <Link to="/home">Voltar para a minha hospedagem</Link>
              : <Link to="/kitchen">Voltar para a cozinha</Link>}
        </form>
      </div>
    </div>
  );
}