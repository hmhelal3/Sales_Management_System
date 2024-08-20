package insa.sms.dto;

import insa.sms.model.SalesInvoceDetail;

import java.math.BigDecimal;
import java.util.List;

public class SalesInvoiceRequestDTO {
    private Integer id;
    private String invoiceNo;

    private String paymentType;
    private String createdDate;
    private BigDecimal totalPrice;
    private BigDecimal totalTax;
    private BigDecimal netTotalPrice;
    private List<SalesInvoceDetail> listOfsalesInvoceDetail;
    private Integer customerId;
    private CustomerDTO customerDTO;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getTotalTax() {
        return totalTax;
    }

    public void setTotalTax(BigDecimal totalTax) {
        this.totalTax = totalTax;
    }

    public BigDecimal getNetTotalPrice() {
        return netTotalPrice;
    }

    public void setNetTotalPrice(BigDecimal netTotalPrice) {
        this.netTotalPrice = netTotalPrice;
    }

    public String getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }



    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<SalesInvoceDetail> getListOfsalesInvoceDetail() {
        return listOfsalesInvoceDetail;
    }

    public void setListOfsalesInvoceDetail(List<SalesInvoceDetail> listOfsalesInvoceDetail) {
        this.listOfsalesInvoceDetail = listOfsalesInvoceDetail;
    }

    public CustomerDTO getCustomerDTO() {
        return customerDTO;
    }

    public void setCustomerDTO(CustomerDTO customerDTO) {
        this.customerDTO = customerDTO;
    }
}

