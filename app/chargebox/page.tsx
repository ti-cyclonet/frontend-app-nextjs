import React from 'react'
import ChargeCrud from "@chargebox/ui/components/ChargeCrud"
import { ChargeProvider } from "@chargebox/ui/context/ChargeboxContext"

function ChargeBox() {
    return (
        <ChargeProvider>
            <ChargeCrud />
        </ChargeProvider>
    )
}

export default ChargeBox