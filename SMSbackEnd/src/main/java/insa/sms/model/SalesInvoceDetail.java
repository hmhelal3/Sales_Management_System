package insa.sms.model;


import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "sales_invoce_detail")
@NamedQuery(name = "SalesInvoceDetail.findBySalesInvoiceIddd", query = "SELECT s FROM SalesInvoceDetail s WHERE s.salesInvoiceId.id = :id")
@NamedQuery(name = "SalesInvoceDetail.findSaleceInvoiceDetalDataById", query = "SELECT s FROM SalesInvoceDetail s WHERE s.id = :id")

@NamedQuery(name = "SalesInvoceDetail.findSaleceInvoiceDetalDataByInvoiceNo", query = "SELECT s FROM SalesInvoceDetail s WHERE s.salesInvoiceId.invoiceNo = :invoiceNo")

public class SalesInvoceDetail implements Serializable {
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)

    private Integer id;
    private String itemServiceName;
    private String code;
    private String uom;
    private Integer quantity;
    private Double tax;
    private BigDecimal sellingUnitPrice;
    private Double taxTotal;

    private Double total;
//    private String invoiceNo;

    @ManyToOne()
    @JoinColumn(name = "sales_invoice_id", referencedColumnName = "id")
    private SalesInvoice salesInvoiceId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @ManyToOne
//    @JoinColumn(name = "sales_invoice_id", referencedColumnName = "id")
//    private SalesInvoice salesInvoice;
    @ManyToOne
    @JoinColumn(name = "item_service_id", referencedColumnName = "id")
    private ItemService itemServiceId;

    public SalesInvoceDetail() {}

    public SalesInvoceDetail(Integer id, Integer quantity, BigDecimal sellingUnitPrice, SalesInvoice salesInvoiceId, ItemService  itemServiceId) {
        this.id = id;

        this.quantity = quantity;
        this.sellingUnitPrice = sellingUnitPrice;
        this.salesInvoiceId = salesInvoiceId;
        this.itemServiceId = itemServiceId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemServiceName() {
        return itemServiceName;
    }

    public void setItemServiceName(String itemServiceName) {
        this.itemServiceName = itemServiceName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUom() {
        return uom;
    }

    public Double getTax() {
        return tax;
    }

    public BigDecimal getSellingUnitPrice() {
        return sellingUnitPrice;
    }

    public Double getTaxTotal() {
        return taxTotal;
    }

    public Double getTotal() {
        return total;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }






    public void setTax(Double tax) {
        this.tax = tax;
    }




    public void setTaxTotal(Double taxTotal) {
        this.taxTotal = taxTotal;
    }




    public void setTotal(Double total) {
        this.total = total;
    }





    public void setSellingUnitPrice(BigDecimal sellingUnitPrice) {
        this.sellingUnitPrice = sellingUnitPrice;
    }

    public SalesInvoice getSalesInvoiceId() {
        return salesInvoiceId;
    }

    public void setSalesInvoiceId(SalesInvoice salesInvoiceId) {
        this.salesInvoiceId = salesInvoiceId;
    }

    public ItemService getItemServiceId() {
        return itemServiceId;
    }

    public void setItemServiceId(ItemService itemServiceId) {
        this.itemServiceId = itemServiceId;
    }
    //    public ItemService getItemService() {
//        if (itemService == null){
//            itemService = new ItemService();
//        }
//        return itemService;
//    }
//
//    public void setItemService(ItemService itemService) {
//        this.itemService = itemService;
//    }
//
//    public SalesInvoice getSalesInvoice() {
//        if (salesInvoice == null) {
//            salesInvoice = new SalesInvoice();
//        }
//        return salesInvoice;
//    }

//    public void setSalesInvoice(SalesInvoice salesInvoice) {
//        this.salesInvoice = salesInvoice;
//    }

    @Override
    public String toString() {
        return "SalesInvoceDetail{" +
                "id=" + id +
                ", itemServiceName='" + itemServiceName + '\'' +
                ", code='" + code + '\'' +
                ", uom='" + uom + '\'' +
                ", quantity=" + quantity +
                ", tax=" + tax +
                ", sellingUnitPrice=" + sellingUnitPrice +
                ", taxTotal=" + taxTotal +
                ", total=" + total +
                ", salesInvoiceId=" + salesInvoiceId +
                ", itemServiceId=" + itemServiceId +
                '}';
    }
}
