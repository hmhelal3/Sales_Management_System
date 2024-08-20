package insa.sms.resource;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import insa.sms.dto.InvoiceHeaderAndDetailDTO;
import insa.sms.dto.SalesInvoiceDetailDTO;
import insa.sms.dto.SalesInvoiceRequestDTO;
import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Customer;
import insa.sms.model.ItemService;
import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;
import insa.sms.repo.CustomerRepo;
import insa.sms.repo.ItemServiceRepo;
import insa.sms.repo.SalesInvoiceDetailRepo;
import insa.sms.repo.SalesInvoiceRepo;
import insa.sms.service.PdfGenerationService;
import insa.sms.service.SalesInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sales-invoice")
public class SalesInvoiceResource {
        @Autowired
        private final SalesInvoiceRepo salesInvoiceRepo;
    @Autowired
    private final ItemServiceRepo itemServiceRepo;
    @Autowired
    private final CustomerRepo customerRepo;
    @Autowired
        private final SalesInvoiceService salesInvoiceService;
    @Autowired
    private final PdfGenerationService pdfGenerationService;
    @Autowired
    private final SalesInvoiceDetailRepo salesInvoiceDetailRepo;
//    @Inject
//    SalesInvoice salesInvoice;
//    @Inject
//    SalesInvoceDetail salesInvoceDetail;
//SalesInvoice salesInvoice = new SalesInvoice();

        public SalesInvoiceResource(ItemServiceRepo itemServiceRepo, SalesInvoiceDetailRepo salesInvoiceDetailRepo, CustomerRepo customerRepo, SalesInvoiceService salesInvoiceService, SalesInvoiceRepo salesInvoiceRepo, PdfGenerationService pdfGenerationService) {
            this.itemServiceRepo = itemServiceRepo;
            this.salesInvoiceDetailRepo = salesInvoiceDetailRepo;
            this.salesInvoiceService = salesInvoiceService;
            this.salesInvoiceRepo = salesInvoiceRepo;
            this.pdfGenerationService = pdfGenerationService;
            this.customerRepo = customerRepo;
        }

        @GetMapping("/all")
        public List<SalesInvoice> getAllSaleceInvoices () {

            return salesInvoiceRepo.findAll();
        }

    @GetMapping("/totalCreditSellingPrice")
    public  Long getTotalCreditSellingPrice() {
        return salesInvoiceService.getTotalCreditSellingPrice();
    }
    @GetMapping("/totalCashSellingPrice")
    public  Long getTotalCashSellingPrice() {
        return salesInvoiceService.getTotalCashSellingPrice();
    }
    @GetMapping("/inv")
    public Map<String, String>  getInvoiceNo(){
        System.out.println("invoiceNo is this " + salesInvoiceService.generateInvoiceNo());
        String invNo =  salesInvoiceService.generateInvoiceNo();
        Map<String, String> response = new HashMap<>();
        response.put("invoiceNo", invNo);
        return response;
    }


//    @GetMapping("/all")
//    public ResponseEntity<List<ItemService>> getAllItemServices () {
//        List<ItemService> itemServices = itemServiceService.findAllItemService();
//        return new ResponseEntity<>(itemServices, HttpStatus.OK);
//    }

        @GetMapping("/find/{id}")
        public ResponseEntity<SalesInvoice> getSalesInvoiceById (@PathVariable("id") Integer id) {
            SalesInvoice salesInvoice = salesInvoiceService.findSalesInvoiceById(id);
            return new ResponseEntity<>(salesInvoice, HttpStatus.OK);
        }
//    @PutMapping("/updateData/{id}")
//    public ResponseEntity<SalesInvoice> updateSalesInvoiceData(@PathVariable("id") Integer id, @RequestBody SalesInvoiceRequestDTO salesInvoiceRequestDTO) {
////        SalesInvoice updateSalesInvoice = salesInvoiceService.updateSalesInvoic(salesInvoice);
//        SalesInvoice updateSalesInvoice = salesInvoiceService.getUpdateInvoicData(id, salesInvoiceRequestDTO);
//        return new ResponseEntity<>(updateSalesInvoice, HttpStatus.OK);
//    }


//    @PutMapping("/update")
//    public ResponseEntity<SalesInvoice> updateSalesInvoiceData2(@RequestBody SalesInvoice salesInvoice) {
//        System.out.println("check update #####################################");
//        System.out.println("check update ##################################### "+salesInvoice.getPaymentType());
//        SalesInvoice updateSalesInvoice = salesInvoiceService.updateSalesInvoice(salesInvoice);
//        return new ResponseEntity<>(updateSalesInvoice, HttpStatus.OK);
//    }

    @PutMapping("/update")
    public ResponseEntity<SalesInvoice> updateSalesInvoiceData2(@RequestBody SalesInvoiceRequestDTO salesInvoiceRequestDTO) {
        System.out.println("check update #####################################");
        System.out.println("ptype update ##################################### "+salesInvoiceRequestDTO.getPaymentType());
//        SalesInvoice salesInvoiceData =  salesInvoiceRepo.findBySalesInvoiceIdd(salesInvoiceRequestDTO.getId());
        SalesInvoice salesInvoiceData =  salesInvoiceRepo.findBySalesInvoiceNo(salesInvoiceRequestDTO.getInvoiceNo());
        salesInvoiceData.setInvoiceNo(salesInvoiceRequestDTO.getInvoiceNo());
        salesInvoiceData.setCreatedDate(salesInvoiceRequestDTO.getCreatedDate());
        salesInvoiceData.setPaymentType(salesInvoiceRequestDTO.getPaymentType());
        Customer customer = customerRepo.findCustById(salesInvoiceRequestDTO.getCustomerId());
        salesInvoiceData.setCustomerId(customer);
        salesInvoiceData.setTotalPrice(salesInvoiceRequestDTO.getTotalPrice());
        salesInvoiceData.setTotalTax(salesInvoiceRequestDTO.getTotalTax());
        salesInvoiceData.setNetTotalPrice(salesInvoiceRequestDTO.getNetTotalPrice());
        salesInvoiceData.setCreatedDate("05/12/2023");
        salesInvoiceRepo.save(salesInvoiceData);
        List<SalesInvoceDetail> deletOldDetaiValue =  salesInvoiceDetailRepo.findBySalesInvoiceIddd(salesInvoiceData.getId());
        salesInvoiceDetailRepo.deleteInBatch(deletOldDetaiValue);

        List<SalesInvoceDetail> listOfsalesInvoceDetail =  salesInvoiceRequestDTO.getListOfsalesInvoceDetail();
        for (SalesInvoceDetail detail : listOfsalesInvoceDetail) {
            detail.setSalesInvoiceId(salesInvoiceData);
           // ItemService itemService = itemServiceRepo.findItemServiceDataById(detailDTO.getItemServiceId());
            detail.setItemServiceId(detail.getItemServiceId());
            detail.setItemServiceName(detail.getItemServiceName());
            detail.setCode(detail.getCode());
            detail.setUom(detail.getUom());
            detail.setQuantity(detail.getQuantity());
            detail.setTax(detail.getTax());
            detail.setSellingUnitPrice(detail.getSellingUnitPrice());
            detail.setTaxTotal(detail.getTaxTotal());
            detail.setTotal(detail.getTotal());
        }
        salesInvoiceDetailRepo.saveAll(listOfsalesInvoceDetail);

        return new ResponseEntity<>(salesInvoiceData, HttpStatus.OK);
    }




    @PutMapping(value = "/example")
    public ResponseEntity<SalesInvoice> updateSalesInvoiceData( @RequestBody SalesInvoiceRequestDTO salesInvoiceRequestDTO) {
//        SalesInvoice updateSalesInvoice = salesInvoiceService.updateSalesInvoic(salesInvoice);
        System.out.println("check update #####################################");
        SalesInvoice salesInvoice = salesInvoiceRepo.findBySalesInvoiceNo(salesInvoiceRequestDTO.getInvoiceNo());
        salesInvoice.setPaymentType(salesInvoiceRequestDTO.getPaymentType());

        List<SalesInvoceDetail> salesInvoceDetail = salesInvoiceDetailRepo.findBySalesInvoiceId(salesInvoice);
        SalesInvoice updateSalesInvoice = salesInvoiceService.getUpdateInvoicData2( salesInvoice,salesInvoceDetail);
        return new ResponseEntity<>(updateSalesInvoice, HttpStatus.OK);
    }

//    @PutMapping("/update/{idd}")
//    public ResponseEntity<SalesInvoice> updateSalesInvoice(@PathVariable Integer id , @RequestBody SalesInvoice newSalesInvoiceData )  {
//        System.out.println("invoiceNo 22222222 ###################################ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ##" );
//
////        SalesInvoice existingSalesInvoice =salesInvoiceService.findSalesInvoiceById(id);
//        SalesInvoice existingSalesInvoice = salesInvoiceRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
//        Customer customer = customerRepo.findCustById(newSalesInvoiceData.getCustomerId().getId());
//
//        System.out.println("id   ididididid invoiceNObbbbbbbbbbbbbbbbbbbbbbbbbbbbb "+id);
////        if (optionalSalesInvoice.isPresent()) {
////            SalesInvoice existingSalesInvoice = optionalSalesInvoice.get();
//        existingSalesInvoice.setCustomerId(customer);
//            existingSalesInvoice.setPaymentType(newSalesInvoiceData.getPaymentType());
//            existingSalesInvoice.setRemarks(newSalesInvoiceData.getRemarks());
//            System.out.println("id   ididididid invoiceNObbbbbbbbbbbbbbbbbb "+existingSalesInvoice.getPaymentType());
//            SalesInvoice updatedItem = salesInvoiceRepo.save(existingSalesInvoice);
////            return ResponseEntity.ok(updatedItem);
//        return new ResponseEntity<>(updatedItem, HttpStatus.OK);
////        } else {
////            return ResponseEntity.notFound().build();
////        }
//    }



            @PostMapping("/add")
    public ResponseEntity<SalesInvoice> addItemService(@RequestBody SalesInvoiceRequestDTO salesInvoiceRequestDTO) {
                SalesInvoice newSalesInvoice = salesInvoiceService.addSalesInvoice(salesInvoiceRequestDTO);
                return new ResponseEntity<>(newSalesInvoice, HttpStatus.CREATED);
    }


    @PostMapping("/insert-data")
    public ResponseEntity<SalesInvoice> insertData(@RequestBody InvoiceHeaderAndDetailDTO data) {
//        SalesInvoice salesInvoice = salesInvoiceService.insertInvoice(data);

        SalesInvoice salesInvoice = data.getInvoiceHeader();
        List<SalesInvoceDetail> listOfsalesInvoceDetail = data.getListOfsalesInvoceDetail();
        salesInvoiceRepo.save(salesInvoice);
        for (SalesInvoceDetail detail : listOfsalesInvoceDetail) {
            detail.setSalesInvoiceId(salesInvoice);
        }
        salesInvoiceDetailRepo.saveAll(listOfsalesInvoceDetail);


        return new ResponseEntity<>(salesInvoice, HttpStatus.CREATED);
    }



//        @PostMapping("/add")
//        public SalesInvoice addSalesInvoice1(@RequestBody SalesInvoice salesInvoice) {
////            JSONArray jsonArray = new JSONArray(string_of_json_array);
//
//            for(int i = 0; i<2; i++){
//                ItemService itemService = new ItemService();
//                itemService.setItemServiceName(salesInvoice.getItemService().getItemServiceName());
//                itemService.setCode(salesInvoice.getItemService().getCode());
//                itemService.setQuantity(salesInvoice.getItemService().getQuantity());
//                itemService.setSellingUnitPrice(salesInvoice.getItemService().getSellingUnitPrice());
//                salesInvoice.setItemService(itemService);
//            }
////          List<SalesInvoceDetail> formDtos = salesInvoice.getSalesInvoceDetailList();
////            salesInvoice.addDetail(salesInvoceDetail);
//            return salesInvoiceRepo.save(salesInvoice);
//        }







        /////Delete by id
        @DeleteMapping("/delete/{id}")
        public  ResponseEntity<Map<String, Boolean>> deleteSalesInvoice(@PathVariable Integer id) {
            SalesInvoice salesInvoice = salesInvoiceRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
            salesInvoiceRepo.delete(salesInvoice);
            Map<String , Boolean> response = new HashMap<>();
            response.put("delete", Boolean.TRUE);
            return  ResponseEntity.ok(response);
        }


    @DeleteMapping("/deletbyInvoiceNo/{invoiceNo}")
    public void deleteSalesInvoiceByInvoiceNo(@PathVariable String invoiceNo) {
        salesInvoiceRepo.deleteSalesInvoiceByInvoiceNo(invoiceNo);
    }



    @GetMapping("/findBySalesInvoiceId/{id}")
    public List<SalesInvoceDetail> getSalesInvoiceDetaileData(@PathVariable Integer id) {

        return salesInvoiceService.findSalesInvoiceDetailDataBySalesInvoiceId(id);
    }


    @GetMapping("/findByInvoiceNo/{invoiceNo}")
    public SalesInvoice getInvoiceNo(@PathVariable String invoiceNo) {

        return salesInvoiceRepo.findBySalesInvoiceNo(invoiceNo);
    }
    @GetMapping("/findByInvoiceNoDet/{invoiceNo}")
    public List<SalesInvoceDetail> getSalesInvoiceDetaileDataByInvoiceNo(@PathVariable String invoiceNo) {

        return salesInvoiceService.findSalesInvoiceDetailDataBySalesInvoiceNo(invoiceNo);
    }

    @GetMapping("/generatepdf{invoiceNo}")
    public ResponseEntity<Resource> downloadInvoicePdf(@PathVariable String invoiceNo) {
            System.out.println("invoiceNO invoiceNObbbbbbbbbbbbbbbbbbbbbbbbbbbbb "+invoiceNo);
        SalesInvoice invoiceHeader = salesInvoiceService.findByInvoiceNo(invoiceNo);
        System.out.println("invoiceHeader  "+invoiceHeader.getInvoiceNo());
        System.out.println("invoiceHeader  "+invoiceHeader.getPaymentType());
        if (invoiceHeader == null) {
            return ResponseEntity.notFound().build();
        }

        List<SalesInvoceDetail> invoiceDetails = salesInvoiceService.findSalesInvoiceDetailDataBySalesInvoiceNo(invoiceNo);
        if (invoiceDetails.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Generate PDF and save it to a file
        pdfGenerationService.generateInvoicePdf(invoiceHeader, invoiceDetails);

        // Prepare the file for download
       Resource fileResource = new FileSystemResource("F:/spring boot project/frontend" + invoiceNo + ".pdf");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Invoice_" + invoiceNo + ".pdf\"")
                .body(fileResource);
    }


    @GetMapping("/findByInvNo/{invoiceNo}")
    public ResponseEntity<?> getInvoiceByNumber(@PathVariable String invoiceNo) {
        System.out.println("invoiceNumber invoiceHeader invoiceHeader  "+invoiceNo);
        SalesInvoice header = salesInvoiceService.findByInvoiceNo(invoiceNo);
        if (header == null) {
            return ResponseEntity.notFound().build();
        }
        List<SalesInvoceDetail> details = salesInvoiceService.findSalesInvoiceDetailDataBySalesInvoiceNo(invoiceNo);
        Map<String, Object> data = new HashMap<>();
        data.put("header", header);
        data.put("details", details);
        System.out.println("header invoiceHeader invoiceHeader  "+header);
        System.out.println("details invoiceHeader invoiceHeader  "+details);
        return ResponseEntity.ok(data);
    }






    @GetMapping("/invoice/{invoiceNumber}")
    public void generateInvoicePdf(@PathVariable String invoiceNumber, HttpServletResponse response) throws IOException, DocumentException {
//        InvoiceHeader header = invoiceService.getInvoiceHeaderByNumber(invoiceNumber);
        SalesInvoice header = salesInvoiceService.findByInvoiceNo(invoiceNumber);
//        List<InvoiceDetail> details = invoiceService.getInvoiceDetailsByHeaderId(header.getId());
        List<SalesInvoceDetail> details = salesInvoiceService.findSalesInvoiceDetailDataBySalesInvoiceNo(invoiceNumber);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);

        document.open();
        document.add(new Paragraph("Invoice No.: " + header.getInvoiceNo()));
        document.add(new Paragraph("Customer: " + header.getCustomerId().getCustomerName()));
        document.add(new Paragraph("paymentType: " + header.getPaymentType()));
        document.add(new Paragraph("Tin No: " + header.getCustomerId().getTinNo()));

        PdfPTable table = new PdfPTable(8);
        table.addCell("Item/Service Name");
        table.addCell("Code");
        table.addCell("uom");
        table.addCell("Qty");
        table.addCell("tax");
        table.addCell("Unit price");
        table.addCell("total tax");
        table.addCell("total amount");


        for (SalesInvoceDetail detail : details) {
            table.addCell(detail.getItemServiceName());
            table.addCell(detail.getCode());
            table.addCell(detail.getUom());
            table.addCell(String.valueOf(detail.getQuantity()));
            table.addCell(String.valueOf(detail.getTax()));
            table.addCell(String.valueOf(detail.getSellingUnitPrice()));
            table.addCell(String.valueOf(detail.getTaxTotal()));
            table.addCell(String.valueOf(detail.getTotal()));
        }

        document.add(table);
        document.close();

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
        response.getOutputStream().write(byteArrayOutputStream.toByteArray());
    }










        /////Delete by id
//    @DeleteMapping("/delete/{id}")
//    public  ResponseEntity<?> deleteItemService1(@PathVariable Integer id) {
//        ItemService itemService1 = itemServiceRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
//        itemServiceRepo.delete(itemService1);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }


//    @RequestMapping("/bill")
//    public interface BillRest {
//        @PostMapping("/generate-report")
//        public ResponseEntity<String> generateReport(@RequestBody Map<String, Object> requestMap);
//        @GetMapping
//        public ResponseEntity<List<Bill>> getBills();
//        @PostMapping("/get-pdf")
//        public ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap);
//        @DeleteMapping("/{id}")
//        public ResponseEntity<String> deleteBill(@PathVariable Integer id);
//    }
//
//    @Autowired
//    CartDaoImpl cartDao;
//
//
//    @PostMapping("/cart")
//    public int getTotal(@RequestBody NewCart[] cart, Model model){
//        cartDao.saveToCart(cart);
//        return cartDao.claculateTotal(cart);
//    }
//
//    @RequestMapping("/changeDB")
//    public boolean changeDB(){
//        cartDao.updateDB();
//        return true;
//    }
//
//    @PostMapping("/addToCart")
//    public NewCart[] increaseQuantity(@RequestBody NewCart[] cart, Model model){
//        cartDao.addItems(cart);
//        return cart;
//    }
//
//    @PostMapping("/addNewItem")
//    public boolean addNewItem(@RequestParam("file") MultipartFile file, @RequestParam("newFoodItem") String newFoodData) throws IOException {
//        return cartDao.addNewItem(file,newFoodData);
//    }
//
//
//    @PostMapping("/addNewItemUrl")
//    public boolean addNewItemByUrl(@RequestParam("newFoodItem") String newFoodData) throws IOException {
//        return cartDao.addNewItemWithUrl(newFoodData);
//    }
//
//    @PostMapping("/checkItemId")
//    public boolean checkItemId(@RequestBody String itemId, Model model){
//        return !cartDao.itemIdAvailable(itemId);
//    }
//
//
//
//
//





    }
