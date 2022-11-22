import React, { useState } from 'react'
import './index.css'
import ModalCustom from '../Modal'
import { showModal, closeModal } from '../Modal'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { SettingsRemoteTwoTone } from '@mui/icons-material';

let getUsersTry = 0
function Login(props) {
    props.funcNav(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loggedUser = []
    const [users, setUsers] = useState([])
    
    const Login = () => {
        showModal('spin','Aguarde',false)
        if(users.find((account) => {return account.username === username }) != undefined){
            if(users.find((account) => {return password === account.password}) != undefined && users.find((account) => {return account.username === username }) != undefined){
                loggedUser.push(users.find((account) => {return account.username === username }))
                console.log(loggedUser)
                localStorage.setItem('dasiBoard', JSON.stringify(loggedUser[0].id))
                setTimeout(() => {
                    closeModal('success','Conectado! Você será redirecionado para a página principal.','barLoading')
                    window.location.href = './now '
                }, 600)
            }else{
                closeModal('erro','Credenciais incorretas','barLoading')
            }
        }else{
            closeModal('erro','Credenciais incorretas','barLoading')
        }
    }
    
    const callAgentFinder = async() => {
    
        try{
            const response = await fetch('https://web-production-8ce4.up.railway.app/api/user')
            const data = response.json()
            data.then(
                (val) => {setUsers(val.data)
                    
                    console.log(username, password)
                    console.log(users.find((account) => {return account.username === username }))            
                    
                })
                console.log(users)
        }catch(error){
            console.log(error)
        }
    }

    if(getUsersTry < 10){
        getUsersTry++
        callAgentFinder()
    }

    return (
        <div className='divMainLoginLinda'>
            <div className="divLoginMainContainer">
                <ModalCustom/>
                <div className="divLoginLeftContainer">
                    <img src={require("./assets/logo.png")} />
                    <h1>Sua escalada começa aqui</h1>
                    <p>Escale sua equipe para jogar nos mais diversos torneios criados pela comunidade. </p>

                    <div className='links'>
                        <GitHubIcon sx={{fontSize: "8vh", color: "#fc6b03"}}></GitHubIcon>
                        <TwitterIcon  sx={{fontSize: "8vh", color: "#fc6b03"}} ></TwitterIcon>
                        <TwitterIcon  sx={{fontSize: "8vh", color: "#fc6b03"}} ></TwitterIcon>
                        {/* <img className="discord" src={require("./assets/discord.png")}></img> */}
                    </div>
                </div>
                <div className="divLoginRightContainer">
                    <div className='divLoginRightSubContaner'>
                        <h1>Entrar</h1>
                        <p className='p'>Entre com sua conta ja cadastrada</p>

                        <input value={username} onChange={event => {setUsername(event.target.value)}} placeholder='Usuário'></input>
                        <input value={password} onChange={event => {setPassword(event.target.value)}} type='password' placeholder='Senha'></input>
                        <button onClick={() => Login()}>Entrar</button>

                        <a href='/cadastro'><p>Esqueceu sua senha?</p></a>
                        <a href='/cadastro'><p>Não possui conta?</p></a>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Login