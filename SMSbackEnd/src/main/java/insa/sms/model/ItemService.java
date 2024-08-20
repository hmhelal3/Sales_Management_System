package insa.sms.model;
import javax.persistence.*;
import java.io.Serializable;

@Entity

@NamedQuery(name = "ItemService.findByItemServiceCode", query = "SELECT s FROM ItemService s WHERE s.code = :code")
@NamedQuery(name = "ItemService.findItemServiceDataById", query = "SELECT s FROM ItemService s WHERE s.id = :id")

public class ItemService implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String code;

    private String description;

    private String itemServiceName;

    private Double purchasedPrice;

    private Integer quantity;

    private Double sellingUnitPrice;

    private Double tax;

    private String uom;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category categoryId;

    public ItemService(){ }

    public ItemService(String itemServiceName, String code, String uom, String description, Double purchasedPrice, double tax, Double sellingUnitPrice, Integer quantity) {
        this.itemServiceName = itemServiceName;
        this.code = code;
        this.uom = uom;
        this.description = description;
        this.purchasedPrice = purchasedPrice;
        this.tax = tax;
        this.sellingUnitPrice = sellingUnitPrice;
        this.quantity = quantity;
    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }


    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setItemServiceName(String itemServiceName) {
        this.itemServiceName = itemServiceName;
    }

    public String getItemServiceName() {
        return itemServiceName;
    }

    public void setPurchasedPrice(Double purchasedPrice) {
        this.purchasedPrice = purchasedPrice;
    }

    public Double getPurchasedPrice() {
        return purchasedPrice;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setSellingUnitPrice(Double sellingUnitPrice) {
        this.sellingUnitPrice = sellingUnitPrice;
    }

    public Double getSellingUnitPrice() {
        return sellingUnitPrice;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public String getUom() {
        return uom;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String toString() {
        return itemServiceName;
    }
}
