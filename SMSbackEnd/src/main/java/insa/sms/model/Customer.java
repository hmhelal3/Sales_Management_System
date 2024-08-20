package insa.sms.model;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
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
//    private Set<SalesInvoice> salesInvoiceSet;

    public Customer() {}

    public Customer(String city, String contactPerson, String country, String customerName, String remarks, String tinNo, String customerType, String vatNo, String businessType, Integer branchId, String customerStatus, String phoneNo, String region) {
        this.city = city;
        this.contactPerson = contactPerson;
        this.country = country;
        this.customerName = customerName;
        this.remarks = remarks;
        this.tinNo = tinNo;
        this.customerType = customerType;
        this.vatNo = vatNo;
        this.businessType = businessType;
        this.branchId = branchId;
        this.customerStatus = customerStatus;
        this.phoneNo = phoneNo;
        this.region = region;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
//    public void setCustomerId(Integer customerId) {
//        this.customerId = customerId;
//    }
//
//    public Integer getCustomerId() {
//        return customerId;
//    }

//    public Set<SalesInvoice> getSalesInvoiceSet() {
//        return salesInvoiceSet;
//    }
//
//    public void setSalesInvoiceSet(Set<SalesInvoice> salesInvoiceSet) {
//        this.salesInvoiceSet = salesInvoiceSet;
//    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getRemarks() {
        return remarks;
    }

    public String getTinNo() {
        return tinNo;
    }

    public void setTinNo(String tinNo) {
        this.tinNo = tinNo;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setVatNo(String vatNo) {
        this.vatNo = vatNo;
    }

    public String getVatNo() {
        return vatNo;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBranchId(Integer branchId) {
        this.branchId = branchId;
    }

    public Integer getBranchId() {
        return branchId;
    }

    public void setCustomerStatus(String customerStatus) {
        this.customerStatus = customerStatus;
    }

    public String getCustomerStatus() {
        return customerStatus;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRegion() {
        return region;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", country='" + country + '\'' +
                ", customerName='" + customerName + '\'' +
                ", remarks='" + remarks + '\'' +
                ", tinNo='" + tinNo + '\'' +
                ", customerType='" + customerType + '\'' +
                ", vatNo='" + vatNo + '\'' +
                ", businessType='" + businessType + '\'' +
                ", branchId=" + branchId +
                ", customerStatus='" + customerStatus + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", region='" + region + '\'' +
                '}';
    }
}
