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
            medicalFile.organisations = [];

            return registry.add(medicalFile);
        });
}

/*function MedicalFileAddVisit(item) {
 var factory = getFactory();

 var namespace = "nl.epd.blockchain";

 var bsn = getCurrentParticipant().getIdentifier();

 var medicalFileRegistry = null;
 var medicalFile = null;

 return validateHealthCareProfessionalPermission(namespace, item, bsn).then(function () {
 return getAssetRegistry(namespace + '.MedicalFile');
 }).then(function(pMedicalFileRegistry){
 medicalFileRegistry = pMedicalFileRegistry;
 return medicalFileRegistry.get(item.bsn);
 }).then(function (pMedicalFile) {
 medicalFile = pMedicalFile;
 return getParticipantRegistry(namespace + '.HealthCareProfessional');
 }).then(function (healthCareProfessionalRegistry) {
 return healthCareProfessionalRegistry.get(bsn);
 }).then(function (healthCareProfessional) {

 var visit = factory.newResource(namespace, 'Visit', "1");
 visit.id = "1";
 visit.description = "testing";
 visit.date = new Date().getTime();
 visit.organisation = factory.newRelationship(namespace, 'Organisation', healthCareProfessional.organisation.getIdentifier());

 medicalFile.visits.push(visit);

 return medicalFileRegistry.update(medicalFile);
 });
 }*/

/*function validateHealthCareProfessionalPermission(namespace, medicalFileAddVisit, bsn) {
    var medicalFile = null;

    return getAssetRegistry(namespace + '.MedicalFile').then(function(medicalFileRegistry){
        return medicalFileRegistry.get(medicalFileAddVisit.bsn);
    }).then(function (asset) {
        medicalFile = asset;
        return getParticipantRegistry(namespace + '.HealthCareProfessional');
    }).then(function (healthCareProfessionalRegistry) {
        return healthCareProfessionalRegistry.get(bsn);
    }).then(function(healthCareProfessional){
        var hasPermission = medicalFile.organisations.some(function (organisation) {
            return organisation.getIdentifier() === healthCareProfessional.organisation.getIdentifier();
        });
        
        if(!hasPermission){
            throw new Error('The professional: ' + bsn + ' has no permission to access this medical file.');
        }
    });
}*/
