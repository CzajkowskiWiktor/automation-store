/// <reference types="Cypress" />

export class EditAddressPage{
    checkUrlAndTitlePage() {
        cy.verifyUrlAndTitlePage("update&address", "Address Book");
      }

    fillFirstName(firstname){
        cy.get('#AddressFrm_firstname').type(firstname)
    }

    fillLastName(lastname){
        cy.get('#AddressFrm_lastname').type(lastname)
    }

    fillCompany(company){
        cy.get('#AddressFrm_company').type(company)
    }

    fillAddress1(address1){
        cy.get('#AddressFrm_address_1').type(address1)
    }

    fillAddress2(address2){
        cy.get('#AddressFrm_address_2').type(address2)
    }

    fillCity(city){
        cy.get('#AddressFrm_city').type(city)
    }

    fillPostcode(postcode){
        cy.get('#AddressFrm_postcode').type(postcode)
    }

    fillCountry(country){
        cy.get('#AddressFrm_country_id').select(country)
    }

    fillZone(zone){
        cy.get('#AddressFrm_zone_id').select(zone)
    }

    clearFirstName(){
        cy.get('#AddressFrm_firstname').clear()
    }

    clearLastName(){
        cy.get('#AddressFrm_lastname').clear()
    }

    clearCompany(){
        cy.get('#AddressFrm_company').clear()
    }

    clearAddress1(){
        cy.get('#AddressFrm_address_1').clear()
    }

    clearAddress2(){
        cy.get('#AddressFrm_address_2').clear()
    }

    clearCity(){
        cy.get('#AddressFrm_city').clear()
    }

    clearPostcode(){
        cy.get('#AddressFrm_postcode').clear()
    }

    clearCountry(){
        cy.get('#AddressFrm_country_id').select("FALSE")
    }

    clearZone(){
        cy.get('#AddressFrm_zone_id').select("FALSE")
    }

    checkValueFirstName(firstname){
        cy.get('#AddressFrm_firstname').should("have.value", firstname);
    }

    checkValueLastName(lastname){
        cy.get('#AddressFrm_lastname').should("have.value", lastname);
    }

    checkValueCompany(company){
        cy.get('#AddressFrm_company').should("have.value", company);
    }

    checkValueAddress1(address1){
        cy.get('#AddressFrm_address_1').should("have.value", address1);
    }

    checkValueAddress2(address2){
        cy.get('#AddressFrm_address_2').should("have.value", address2);
    }

    checkValueCity(city){
        cy.get('#AddressFrm_city').should("have.value", city);
    }

    checkValuePostcode(postcode){
        cy.get('#AddressFrm_postcode').should("have.value", postcode);
    }

    checkValueCountry(country){
        cy.get('#AddressFrm_country_id').find('option:selected').should("contain", country);
    }

    checkValueZone(zone){
        cy.get('#AddressFrm_zone_id').find('option:selected').should("contain", zone);
    }

    clickContinueBtnToEditAddress(){
        cy.get('.contentpanel').find('[title="Continue"]').click()
    }

    clickBackBtn(){
        cy.get('.contentpanel').find('[title="Back"]').click()
    }
};

export const onEditAddressPage = new EditAddressPage();