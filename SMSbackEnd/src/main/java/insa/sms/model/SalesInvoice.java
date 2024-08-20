package insa.sms.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;
import java.util.ArrayList;
import javax.persistence.*;
//import java.io.Serializable;
//import javax.validation.constraints.NotNull;
//import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@NamedQuery(name = "SalesInvoice.findBySalesInvoiceNo", query = "SELECT s FROM SalesInvoice s WHERE s.invoiceNo = :invoiceNo")
@NamedQuery(name = "SalesInvoice.findBySalesInvoiceIdd", query = "SELECT s FROM SalesInvoice s WHERE s.id = :id")
public class SalesInvoice implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)

    private Integer id;
    private String invoiceNo;

    private String paymentType;
    private String createdDate;
    private String remarks;
    private BigDecimal totalPrice;
    private BigDecimal totalTax;
    private BigDecimal netTotalPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customerId;
//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "id" , orphanRemoval = true)
//    private List<SalesInvoceDetail> listOfsalesInvoceDetail;

//    @Column(name = "product_detail", columnDefinition = "json")
//       private String productDetail;

//    private String productDetail;



//    @OneToMany(cascade = CascadeType.ALL)
//    private List<SalesInvoceDetail> SalesInvoceDetailList;


    public SalesInvoice() {}

    public SalesInvoice(Integer id, String invoiceNo, String paymentType, String createdDate, BigDecimal totalPrice) {
        this.id = id;
        this.invoiceNo = invoiceNo;

        this.paymentType = paymentType;
        this.createdDate = createdDate;
        this.totalPrice = totalPrice;
    }

//    public List<SalesInvoceDetail> getListOfsalesInvoceDetail() {
//        if (listOfsalesInvoceDetail == null) {
//            listOfsalesInvoceDetail = new ArrayList<>();
//        }
//        return listOfsalesInvoceDetail;
//    }
//
//    public void setListOfsalesInvoceDetail(List<SalesInvoceDetail> listOfsalesInvoceDetail) {
//        this.listOfsalesInvoceDetail = listOfsalesInvoceDetail;
//    }

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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

//    public String getProductDetail() {
//        return productDetail;
//    }
//
//    public void setProductDetail(String productDetail) {
//        this.productDetail = productDetail;
//    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }



    public Customer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Customer customerId) {
        this.customerId = customerId;
    }

    //    public String getProductDetail() {
//        return productDetail;
//    }
//
//    public void setProductDetail(String productDetail) {
//        this.productDetail = productDetail;
//    }
//    public Customer getCustomer() {
//        if (customer == null) {
//            customer = new Customer();
//        }
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }

    //    @XmlTransient
//    public List<NebeComplain> getNebeComplainList() {
//        if (nebeComplainList == null) {
//            nebeComplainList = new ArrayList<>();
//        }
//        return nebeComplainList;
//    }
//
//    public void setNebeComplainList(List<NebeComplain> nebeComplainList) {
//        this.nebeComplainList = nebeComplainList;
//    }
//    @XmlTransient
//    public List<SalesInvoceDetail> getSalesInvoceDetailList() {
//        if (SalesInvoceDetailList == null) {
//            SalesInvoceDetailList = new ArrayList<>();
//        }
//        return SalesInvoceDetailList;
//    }
//
//    public void setSalesInvoceDetailList(List<SalesInvoceDetail> salesInvoceDetailList) {
//        SalesInvoceDetailList = salesInvoceDetailList;
//    }
//    public void addDetail(SalesInvoceDetail salesInvoceDetail) {
//        if (salesInvoceDetail.getSalesInvoice() != this) {
//            this.getSalesInvoceDetailList().add(salesInvoceDetail);
//            salesInvoceDetail.setSalesInvoice(this);
//        }
//    }


    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }



    @Override
    public String toString() {
        return "SalesInvoice{" +
                "id=" + id +
                ", invoiceNo='" + invoiceNo + '\'' +

                ", paymentType='" + paymentType + '\'' +
                ", createdDate='" + createdDate + '\'' +
                ", totalPrice=" + totalPrice +
                ", customer=" + customerId +
                '}';
    }
}
