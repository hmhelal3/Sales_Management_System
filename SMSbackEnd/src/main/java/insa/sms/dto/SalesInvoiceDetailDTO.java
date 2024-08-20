package insa.sms.dto;

import insa.sms.model.SalesInvoice;

import java.math.BigDecimal;

public class SalesInvoiceDetailDTO {
    private Integer id;
    private String itemServiceName;
    private String code;
    private String uom;
    private Integer quantity;
    private Double tax;
    private BigDecimal sellingUnitPrice;
    private Double taxTotal;

    private Double total;
    private Integer itemServiceId;



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

    public Integer getItemServiceId() {
        return itemServiceId;
    }

    public void setItemServiceId(Integer itemServiceId) {
        this.itemServiceId = itemServiceId;
    }

    public String getUom() {
        return uom;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getTaxTotal() {
        return taxTotal;
    }

    public void setTaxTotal(Double taxTotal) {
        this.taxTotal = taxTotal;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSellingUnitPrice() {
        return sellingUnitPrice;
    }

    public void setSellingUnitPrice(BigDecimal sellingUnitPrice) {
        this.sellingUnitPrice = sellingUnitPrice;
    }
}


