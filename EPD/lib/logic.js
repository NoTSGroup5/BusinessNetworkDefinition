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

    var then = function (medicalFileRegistry) {
        var medicalFile = factory.newResource(namespace, 'MedicalFile', "test");
        medicalFile.id = "test";
        medicalFile.owner = newPatient.bsn;
        medicalFile.mentors = [];
        medicalFile.permissions = [];
        medicalFile.allergies = [];
        medicalFile.treatments = [];
        medicalFile.medicine = [];

        return medicalFileRegistry.add(medicalFile);
    }.bind(this);


    return getParticipantRegistry(namespace + '.Patient')
        .then(function (patientRegistry) {return patientRegistry.addAll([newPatient]);})
        .then(function(){return getAssetRegistry(namespace + ".MedicalFile")})
        .then( function (medicalFileRegistry) {
            var factory = getFactory();

            var medicalFile = factory.newResource(namespace, 'MedicalFile', "test");
            medicalFile.id = "test";
            medicalFile.owner = newPatient.bsn;
            medicalFile.mentors = [];
            medicalFile.permissions = [];
            medicalFile.allergies = [];
            medicalFile.treatments = [];
            medicalFile.medicine = [];

            return medicalFileRegistry.add(medicalFile);
        });
}

/*function publish(publishBond) {

    return getAssetRegistry('org.acme.bond.BondAsset')
        .then(function (registry) {
            var factory = getFactory();
// Create the bond asset.
            var bondAsset = factory.newResource('org.acme.bond', 'BondAsset', publishBond.ISINCode);
            bondAsset.bond = publishBond.bond;
// Add the bond asset to the registry.
            return registry.add(bondAsset);
        });
}*/

/**
 * Create a new organisation type
 * @param {nl.epd.blockchain.OrganisationType} organisation type - Create a new organisation type
 * @transaction
 */

/*function OrganisationCreateType(type){

}*/

/*
function onPatientCreate() {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    var value = changeAssetValue.relatedAsset.newValue;
    return getAssetRegistry('nl.epd.blockchain.Asset')
    .then(function(ar) {
        assetRegistry = ar;
        return assetRegistry.get(id)
    })
    .then(function(asset) {
        asset.value = changeAssetValue.newValue;
        return assetRegistry.update(asset);
    });
}*/
