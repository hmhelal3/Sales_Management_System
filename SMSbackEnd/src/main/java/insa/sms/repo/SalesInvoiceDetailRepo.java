package insa.sms.repo;

import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.NamedQuery;
import java.util.List;

public interface SalesInvoiceDetailRepo extends JpaRepository<SalesInvoceDetail, Integer> {
//    SalesInvoceDetail findBySalesInvoice(Integer salesInvoiceId);
 List<SalesInvoceDetail> findBySalesInvoiceIddd(Integer id);
 List<SalesInvoceDetail> findBySalesInvoiceId(SalesInvoice salesInvoice);

 List<SalesInvoceDetail> findSaleceInvoiceDetalDataByInvoiceNo(String invoiceNo);
 SalesInvoceDetail findSaleceInvoiceDetalDataById(Integer id);


}
