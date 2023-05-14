import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect } from "react";
import ApplianceStorage from "../../../../storage/ApplianceStorage";

export const CreditPlansDialog = (props) => {
	const { onClose, selectedPlan, open } = props

	useEffect(() => {
		ApplianceStorage.loadPlans()
	}, [])

	const handleClose = () => {
		onClose(selectedPlan.id);
	}

	const handleListItemClick = (planId) => {
		onClose(planId);
	}

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Set credit plan</DialogTitle>
			<List sx={{ pt: 0 }}>
				{
					ApplianceStorage.plans.map((plan) => (
					<ListItem disableGutters key={plan.id}>
						<ListItemButton onClick={() => handleListItemClick(plan.id)}>
							<ListItemText primary={plan.creditAmount} />
							<ListItemText primary={plan.rate.toFixed(1)} />
							<ListItemText primary={plan.firstPayment} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Dialog>
	)
}