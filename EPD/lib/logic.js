'use strict';

/**
 * Create a new patient
 * @param {nl.epd.blockchain.PatientCreate} item - Create a patient
 * @transaction
 */
function PatientCreate(item) {
    var namespace = "nl.epd.blockchain";
    var factory = getFactory();

    var newPatient = factory.newResource(namespace, 'Patient', item.patient.bsn);

    newPatient.bsn = item.patient.bsn;
    newPatient.firstName = item.patient.firstName;
    newPatient.namePrefix = item.patient.namePrefix;
    newPatient.lastName = item.patient.lastName;
    newPatient.email = item.patient.email;
    newPatient.telephoneNumber = item.patient.telephoneNumber;
    newPatient.birthday = item.patient.birthday;
    newPatient.gender = item.patient.gender;
    newPatient.city = item.patient.city;
    newPatient.zipCode = item.patient.zipCode;
    newPatient.street = item.patient.street;
    newPatient.houseNumber = item.patient.houseNumber;
    newPatient.houseNumberExtra = item.patient.houseNumberExtra;


    return getParticipantRegistry(namespace + '.Patient')
        .then(function (patientRegistry) {
            return patientRegistry.add(newPatient);
        }).then(function() {
            return getAssetRegistry('nl.epd.blockchain.MedicalFile');
        }).then(function (registry) {
            var medicalFile = factory.newResource(namespace, 'MedicalFile', newPatient.bsn);
            medicalFile.bsn = newPatient.bsn; // todo: fix this
            medicalFile.owner = factory.newRelationship(namespace, 'Patient', newPatient.bsn);
            medicalFile.mentors = [];
            medicalFile.permissions = [];
            medicalFile.allergies = [];
            medicalFile.treatments = [];
            medicalFile.medicine = [];
            medicalFile.visits = [];

            return registry.add(medicalFile);
        });
}
