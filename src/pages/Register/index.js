import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'
import Switch from "react-switch";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  const [toggle, setToggle] = useState(true);
  const handleSwitch = () => setToggle(!toggle)

  const history = useHistory();

  async function handleRegister(e) {
    /*
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await api.post('/user', data);

      alert('Cadastrado com sucesso');
      history.push('/logon');

    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
    */

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
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="CPF"
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={e => setCep(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Logradouro"
                value={logradouro}
                onChange={e => setLogradouro(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Numero"
                value={numero}
                onChange={e => setNumero(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={e => setBairro(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              />
            </li>

            <li>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={e => setCelular(e.target.value)}
              />
            </li>

            <div className={toggle ? 'inputOn' : 'inputOff'}>
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
                  placeholder="Salario"
                  value={salario}
                  onChange={e => setSalario(e.target.value)}
                  disabled={!toggle}
                />
              </li>
            </div>
          </ul>

          {toggle ? (
            <button type="submit">Cadastrar Funcionário</button>
          ) : (
            <button type="submit">Cadastrar Hóspede</button>
          )}

          <hr />
          <Link to="/logon">Fazer login</Link>
        </form>
      </div>
    </div>
  );
}