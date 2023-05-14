import React, {useEffect} from "react";
import PendingCreditsStorage from "../../../../storage/PendingCreditsStorage";
import {observer} from "mobx-react-lite";
import {CreditApplianceCard} from "./CreditApplianceCard";

export const AppliancesList = observer(() => {

	useEffect(() => {
		PendingCreditsStorage.fetchPendings()
	}, [])

	return (
		<div>
			{
				PendingCreditsStorage.pendings
					.map(credit => {
						return (
						<CreditApplianceCard
							{...credit}
							rate={credit.plan.rate}
							firstPayment={credit.plan.firstPayment}
							creditAmount={credit.plan.creditAmount}
							key={credit.id}
						/>
					)
				})
			}
		</div>
	)
})