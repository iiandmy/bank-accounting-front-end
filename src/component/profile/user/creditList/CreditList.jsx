import ProfileStorage from "../../../../storage/ProfileStorage";
import React from "react";
import { observer } from "mobx-react-lite";
import { CreditCard } from "../CreditCard";

export const CreditList = observer(() => {
	return (
		<div>
			{
				ProfileStorage.credits
					.filter(credit =>
						ProfileStorage.filterStatus === "" ? true : credit.status === ProfileStorage.filterStatus
					).map(credit => {
						return (
							<CreditCard
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