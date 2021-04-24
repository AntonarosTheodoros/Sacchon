export interface Consultation {
    id: number;
    medicationName: string;
    dosage: string;
    comment: string;
    date: Date;
    doctorId: string;
    patientId: string;
}