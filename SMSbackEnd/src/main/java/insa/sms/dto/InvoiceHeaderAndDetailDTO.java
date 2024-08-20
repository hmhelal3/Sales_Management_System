package insa.sms.dto;

import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;

import java.util.List;

public class InvoiceHeaderAndDetailDTO {
    private SalesInvoice invoiceHeader;
    private List<SalesInvoceDetail> listOfsalesInvoceDetail;

    public SalesInvoice getInvoiceHeader() {
        return invoiceHeader;
    }

    public void setInvoiceHeader(SalesInvoice invoiceHeader) {
        this.invoiceHeader = invoiceHeader;
    }

    public List<SalesInvoceDetail> getListOfsalesInvoceDetail() {
        return listOfsalesInvoceDetail;
    }

    public void setListOfsalesInvoceDetail(List<SalesInvoceDetail> listOfsalesInvoceDetail) {
        this.listOfsalesInvoceDetail = listOfsalesInvoceDetail;
    }
}
