package insa.sms.dto;

import insa.sms.model.SalesInvoice;

import java.util.Set;

public class CustomerDTO {
    private Integer id;

    private String city;

    private String contactPerson;

    private String country;

    private String customerName;

    private String remarks;

    private String tinNo;

    private String customerType;

    private String vatNo;

    private String businessType;

    private Integer branchId;

    private String customerStatus;

    private String phoneNo;

    private String region;
    private Set<SalesInvoiceRequestDTO> salesInvoiceRequestDTO;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getTinNo() {
        return tinNo;
    }

    public void setTinNo(String tinNo) {
        this.tinNo = tinNo;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

    public String getVatNo() {
        return vatNo;
    }

    public void setVatNo(String vatNo) {
        this.vatNo = vatNo;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public String getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(String customerStatus) {
        this.customerStatus = customerStatus;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Set<SalesInvoiceRequestDTO> getSalesInvoiceRequestDTO() {
        return salesInvoiceRequestDTO;
    }

    public void setSalesInvoiceRequestDTO(Set<SalesInvoiceRequestDTO> salesInvoiceRequestDTO) {
        this.salesInvoiceRequestDTO = salesInvoiceRequestDTO;
    }
}
