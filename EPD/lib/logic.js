'use strict';
/**
 * Write your transction processor functions here
 */

function onPatientCreate(patient) {
    var namespace = "nl.epd.blockchain";
    var factory = getFactory();

    var newPatient = factory.newResource(namespace, 'Patient', patient.bsn);

    newPatient.bsn = patient.bsn;
    newPatient.firstName = patient.firstName;
    newPatient.namePrefix = patient.namePrefix;
    newPatient.lastName = patient.lastName;
    newPatient.email = patient.email;
    newPatient.telephoneNumber = patient.telephoneNumber;
    newPatient.birthday = patient.birthday;
    newPatient.gender = patient.gender;
    newPatient.city = patient.city;
    newPatient.zipCode = patient.zipCode;
    newPatient.street = patient.street;
    newPatient.houseNumber = patient.houseNumber;
    newPatient.houseNumberExtra = patient.houseNumberExtra;

    return getParticipantRegistry(namespace + '.Patient').then(function (patientRegistry) {
        patientRegistry.addAll([newPatient]);
    });
}

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
