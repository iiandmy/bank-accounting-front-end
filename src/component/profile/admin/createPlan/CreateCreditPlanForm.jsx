import {Box, Button, Card, CardContent, Divider, FormControl, Input, InputLabel, Typography} from "@mui/material";
import React, {useState} from "react";
import NetworkService from "../../../../network/NetworkService";

export const CreateCreditPlanForm = ({handleCreate}) => {
	const [amount, setAmount] = useState(10000)
	const [firstPayment, setFirstPayment] = useState(amount / 10)
	const [rate, setRate] = useState(1.5)

	const handleAmountChange = (e) => {
		let amountVal = parseInt(e.target.value)
		if (amount === NaN) {
			return
		}
		setAmount(amountVal)
	}

	const handlePaymentChange = (e) => {
		let firstPay = parseInt(e.target.value)
		if (firstPay === NaN) {
			return
		}
		setFirstPayment(firstPay)
	}

	const handleRateChange = (e) => {
		let rateVal = parseFloat(e.target.value)
		if (rateVal === NaN) {
			return
		}
		setRate(rateVal)
	}

	const handleCreatePlan = async () => {
		let resp = await NetworkService.createPlan({
			rate,
			creditAmount: amount,
			firstPayment
		})

		alert(`Created plan with id:${resp.id}!`)
		handleCreate()
	}

	return (
		<div sx={{flexGrow: 1}}>
			<Card>
				<CardContent>
					<Box>
						<Typography variant="h6">
							Fill credit plan information:
						</Typography>
						<Divider sx={{marginY: "1rem"}}/>
						<FormControl variant="standard" sx={{width: "100%"}}>
							<InputLabel>Credit Amount</InputLabel>
							<Input onChange={ handleAmountChange } sx={{width: "100%"}}/>
						</FormControl>
						<FormControl variant="standard" sx={{width: "100%", marginY: "1rem"}}>
							<InputLabel sx={{width: "100%"}}>First Payment</InputLabel>
							<Input onChange={ handlePaymentChange } sx={{width: "100%"}}/>
						</FormControl>
						<FormControl variant="standard" sx={{width: "100%"}}>
							<InputLabel sx={{width: "100%"}}>Rate</InputLabel>
							<Input onChange={ handleRateChange } sx={{width: "100%"}}/>
						</FormControl>
					</Box>
					<Divider sx={{marginY: "1rem"}}/>
					<Button variant="contained" onClick={handleCreatePlan}>Create plan</Button>
				</CardContent>
			</Card>
		</div>
	)
}