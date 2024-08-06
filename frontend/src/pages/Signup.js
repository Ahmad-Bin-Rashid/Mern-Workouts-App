import { useState } from "react"

const Signup = () => {
    const[username, setUsername] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[password2, setPassword2] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password === password2) {

        }
        console.log(username, email, password)
    }

  return (
    <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label htmlFor="">Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} required/>
        <label htmlFor="">Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        <label htmlFor="">Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        <label htmlFor="">Confirm Password</label>
        <input type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} required/>

        <button>Sign up</button>
    </form>
  )
}

export default Signup