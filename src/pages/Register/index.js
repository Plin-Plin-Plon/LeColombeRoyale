import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import { cpfMask, celularMask, telefoneMask, cepMask } from "masks-br";
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'
import Switch from "react-switch";


export default function Register() {
  const [nome, setNome] = useState('');
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
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [premium, setPremium] = useState(false);

  /* Toggle:
      True  -> Funcionário
      False -> Hóspede 
  */
  const [toggle, setToggle] = useState(false);
  const handleSwitch = () => setToggle(!toggle);
  const handlePremium = () => setPremium(!premium);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    console.log(premium);

    if (senha === confirmation) {
      const data = {
        nome,
        email,
        cpf,
        cep,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        telefone,
        celular,
        usuario,
        senha,
        premium
      };

      if (toggle) {
        data.cargo = cargo;
        data.salario = salario;
      } else {
        data.premium = premium;
      }

      try {
        const response = await api.post(toggle ? "acesso/register?func=1" : "acesso/register", data);

        alert('Cadastrado com sucesso');
        history.push('/logon');

      } catch (err) {
        alert('Erro no cadastro, tente novamente');
        console.log(err);
      }
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
                value={cep}
                onChange={e => setCep(cepMask(e.target.value))}
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
                type="number"
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
                onChange={e => setTelefone(telefoneMask(e.target.value))}
              />
            </li>

            <li>
              <input
                type="text"
                placeholder="Celular"
                value={celular}
                onChange={e => setCelular(celularMask(e.target.value))}
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
          <Link to="/logon">Fazer login</Link>
        </form>
      </div>
    </div>
  );
}