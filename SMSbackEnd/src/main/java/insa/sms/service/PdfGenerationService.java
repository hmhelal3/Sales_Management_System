package insa.sms.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;
import org.springframework.stereotype.Service;

//import javax.swing.text.Document;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

@Service
public class PdfGenerationService {

    public void generateInvoicePdf(SalesInvoice header, List<SalesInvoceDetail> details) {
        try {
            // Create a new PDF document using iText
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("SalesInvoiceInvoice_" + header.getInvoiceNo() + ".pdf"));

            // Open the document
            document.open();

            // Add header information to the PDF
            document.add(new Paragraph("Invoice Number: " + header.getInvoiceNo()));
            document.add(new Paragraph("Customer Name: " + header.getCustomerId().getCustomerName()));
            document.add(new Paragraph("Tin No. : " + header.getCustomerId().getTinNo()));
            document.add(new Paragraph("Payment Method: " + header.getPaymentType()));
            // Add other header information as needed

            // Add detail information to the PDF
            PdfPTable table = new PdfPTable(8); // Assuming 4 columns for product, quantity, price, and total
            table.addCell("Product");
            table.addCell("Code");
            table.addCell("uom");
            table.addCell("Quantity");
            table.addCell("tax");
            table.addCell("Price");
            table.addCell("tax total");
            table.addCell("Total");

            for (SalesInvoceDetail detail : details) {
                table.addCell(detail.getItemServiceName());
                table.addCell(detail.getCode());
                table.addCell(detail.getUom());
                table.addCell(String.valueOf(detail.getQuantity()));
                table.addCell(String.valueOf(detail.getTax()));
                table.addCell(String.valueOf(detail.getSellingUnitPrice()));
                table.addCell(String.valueOf(detail.getTotal()));
                table.addCell(String.valueOf(detail.getTotal()));
            }

            document.add(table);

            // Close the document
            document.close();
        } catch (DocumentException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}