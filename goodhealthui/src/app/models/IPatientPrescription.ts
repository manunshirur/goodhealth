interface IPatientPrescription {
    name: string,
    ssn: string,
    phy_ssn: string,
    pre_date: Date,
    quantity: number,
    trade_name: string,
    pharm_co_name: string,
    status: PrescriptionStatus
}