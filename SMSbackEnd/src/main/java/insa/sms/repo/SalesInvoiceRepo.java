package insa.sms.repo;

import insa.sms.model.ItemService;
import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SalesInvoiceRepo extends JpaRepository<SalesInvoice, Integer> {
    void deleteSalesInvoiceById(Integer id);
//    void deleteItemServiceObject(ItemService itemService);

    Optional<SalesInvoice> findSalesInvoiceById(Integer id);
    SalesInvoice findBySalesInvoiceIdd(Integer id);

    SalesInvoice findBySalesInvoiceNo(String invoiceNo);
    // Custom named query for deleting data by invoiceNo
    @Modifying
    @Query("DELETE FROM SalesInvoice s WHERE s.invoiceNo = :invoiceNo")
    void deleteSalesInvoiceByInvoiceNo(String invoiceNo);


    SalesInvoice findTopByOrderByIdDesc();

    @Query("SELECT SUM(s.totalPrice) FROM SalesInvoice s where s.paymentType = 'Credit'")
    Long getTotalCreditSellingPrice();
    @Query("SELECT SUM(s.totalPrice) FROM SalesInvoice s where s.paymentType = 'Cash'")
    Long getTotalCashSellingPrice();
}
