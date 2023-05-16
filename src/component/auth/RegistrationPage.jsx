import {useNavigate} from "react-router-dom";
import {
	AppBar,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	FormControl, Input, InputLabel,
	Toolbar,
	Typography
} from "@mui/material";
import React, {useState} from "react";
import AuthStorage from "../../storage/AuthStorage";

export const RegistrationPage = () => {
	const navigate = useNavigate()

	const [fName, setFName] = useState("")
	const [lName, setLName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLoginClick = () => {
		navigate("/login")
	}

	const handleRegisterClick = async () => {
		let response = await AuthStorage.register(fName, lName, email, password)
			.catch(r => {
				alert("User with such email already exists")
				clearFields()
			})
		if (response !== undefined) {
			alert("User successfully created! Log in using your email and password.")
			navigate("/login")
		}
	}

	const clearFields = () => {
		setFName('')
		setLName('')
		setEmail('')
		setPassword('')
	}

	const handleFNameChange = (e) => {
		setFName(e.target.value)
	}

	const handleLNameChange = (e) => {
		setLName(e.target.value)
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Container>
						<Toolbar>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								Bank Accounting
							</Typography>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<Button onClick={handleLoginClick} variant="text" color="inherit">Login</Button>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<Container maxWidth="sm">
				<Card maxWidth={365} sx={{marginTop: "2rem"}}>
					<CardContent>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>REGISTER</Typography>
						<Divider sx={{marginY: "1rem"}}/>
						<Box>
							<FormControl variant="standard" sx={{width: "100%", marginBottom: "1rem"}}>
								<InputLabel>First Name</InputLabel>
								<Input onChange={ handleFNameChange }
									   value={fName}
								/>
							</FormControl>
							<FormControl variant="standard" sx={{width: "100%", marginBottom: "1rem"}}>
								<InputLabel>Last Name</InputLabel>
								<Input onChange={ handleLNameChange }
									   value={lName}
								/>
							</FormControl>
							<FormControl variant="standard" sx={{width: "100%", marginBottom: "1rem"}}>
								<InputLabel>Email</InputLabel>
								<Input onChange={ handleEmailChange }
									   value={email}
								/>
							</FormControl>
							<FormControl variant="standard" sx={{width: "100%", marginBottom: "1rem"}}>
								<InputLabel>Password</InputLabel>
								<Input onChange={ handlePasswordChange }
									   value={password}
								/>
							</FormControl>
						</Box>
						<Divider sx={{marginBottom: "1rem"}} />
						<Button variant="contained" onClick={handleRegisterClick}>Register</Button>
					</CardContent>
				</Card>
			</Container>
		</>
	)
}