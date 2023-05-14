import { Box, Button } from "@mui/material";
import { CreditCard } from "../CreditCard";
import { useState } from "react";
import { CreditPlansDialog } from "./CreditPlansDialog";
import ApplianceStorage from "../../../../storage/ApplianceStorage";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export const ApplianceForm = ({onCreateAppliance}) => {
	const UNIX_MONTH = 2629743000
	const [open, setOpen] = useState(false)
	const [selectedEndDate, setSelectedDate] = useState(new Date().valueOf() + UNIX_MONTH)

	const mockCredit = {
		"plan": {
			"id": 1,
			"rate": 0.0,
			"creditAmount": 7560.0,
			"firstPayment": 200.0
		},
		"status": "PENDING",
		"startDate": dayjs(new Date()).format("DD.MM.YYYY HH:mm"),
		"endDate": dayjs(selectedEndDate).format("DD.MM.YYYY HH:mm")
	}

	const [selectedPlan, setSelectedPlan] = useState(mockCredit.plan)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClickClose = (planId) => {
		setOpen(false)
		let choosenPlan = ApplianceStorage.getPlan(planId)
		setSelectedPlan(choosenPlan)
	}

	const handleApplyClick = async () => {
		if (selectedPlan.rate === 0.0) {
			alert("Credit plan has not been choosen! Try again")
			return
		}

		let response = await ApplianceStorage.applyCredit({
			expiringDate: dayjs(selectedEndDate).format('DD.MM.YYYY HH:mm'),
			creditPlanId: selectedPlan.id
		})
		alert(response.message)
		onCreateAppliance()
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Button variant="outlined"
							sx={{width: "100%", marginBottom: "1rem"}}
							onClick={handleClickOpen}
			>
				Choose credit plan
			</Button>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					defaultValue={dayjs(new Date().valueOf() + UNIX_MONTH)}
					sx={{width: "100%", marginBottom: "1rem"}}
					onChange={setSelectedDate}
					format="DD.MM.YYYY"
				/>
			</LocalizationProvider>
			<CreditCard
				{...mockCredit}
				rate={selectedPlan.rate}
				firstPayment={selectedPlan.firstPayment}
				creditAmount={selectedPlan.creditAmount}
			/>
			<Button variant="contained" sx={{width: "100%"}} onClick={handleApplyClick}>Apply for credit</Button>
			<CreditPlansDialog
				selectedPlan={selectedPlan}
				open={open}
				onClose={handleClickClose}
			/>
		</Box>
	)
}