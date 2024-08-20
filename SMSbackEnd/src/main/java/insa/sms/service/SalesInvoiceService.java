package insa.sms.service;

import insa.sms.dto.InvoiceHeaderAndDetailDTO;
import insa.sms.dto.SalesInvoiceRequestDTO;
import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Customer;
import insa.sms.model.SalesInvoceDetail;
import insa.sms.model.SalesInvoice;
import insa.sms.repo.CustomerRepo;
import insa.sms.repo.ItemServiceRepo;
import insa.sms.repo.SalesInvoiceDetailRepo;
import insa.sms.repo.SalesInvoiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.transaction.Transactional;

@Service
public class SalesInvoiceService {
    @Autowired
    private final SalesInvoiceRepo salesInvoiceRepo;
    @Autowired
    private final ItemServiceRepo itemServiceRepo;
    @Autowired
    private final SalesInvoiceDetailRepo salesInvoiceDetailRepo;
    @Autowired
    private final CustomerRepo customerRepo;

    @Autowired
    public SalesInvoiceService(SalesInvoiceRepo salesInvoiceRepo, ItemServiceRepo itemServiceRepo,
            SalesInvoiceDetailRepo salesInvoiceDetailRepo, CustomerRepo customerRepo) {

        this.salesInvoiceRepo = salesInvoiceRepo;
        this.itemServiceRepo = itemServiceRepo;
        this.salesInvoiceDetailRepo = salesInvoiceDetailRepo;
        this.customerRepo = customerRepo;

    }

    public SalesInvoice insertInvoice(InvoiceHeaderAndDetailDTO data) {
        SalesInvoice salesInvoice = data.getInvoiceHeader();
        List<SalesInvoceDetail> listOfsalesInvoceDetail = data.getListOfsalesInvoceDetail();
        salesInvoiceRepo.save(salesInvoice);
        for (SalesInvoceDetail detail : listOfsalesInvoceDetail) {
            detail.setSalesInvoiceId(salesInvoice);
        }
        salesInvoiceDetailRepo.saveAll(listOfsalesInvoceDetail);

        return salesInvoice;
    }

    public SalesInvoice updateSalesInvoice(SalesInvoice salesInvoice) {
        salesInvoice.setCreatedDate("05/12/2023");
        salesInvoiceRepo.save(salesInvoice);

        return salesInvoice;
    }

    public SalesInvoice getUpdateInvoicData2(SalesInvoice salesInvoice, List<SalesInvoceDetail> salesInvoceDetail) {
        System.out.println("check update #####################################");

        SalesInvoice salesInvoiceData = salesInvoiceRepo.findBySalesInvoiceNo(salesInvoice.getInvoiceNo());
        return salesInvoiceData;
    }

    public SalesInvoice getUpdateInvoicData(Integer id, SalesInvoiceRequestDTO salesInvoiceDtoUpdat) {
        System.out.println("check update #####################################");
        // System.out.println("check update ##################################### "+id);
        System.out.println("invno invoice #####################################" + salesInvoiceDtoUpdat.getInvoiceNo());
        System.out
                .println("ptype invoice #####################################" + salesInvoiceDtoUpdat.getPaymentType());

        SalesInvoice salesInvoiceData = salesInvoiceRepo.findBySalesInvoiceIdd(id);
        //// Optional<SalesInvoice> salesInvoice
        //// =salesInvoiceRepo.findSalesInvoiceById(id);
        //// SalesInvoice salesInvoiceData =
        //// salesInvoiceRepo.findById(id).orElseThrow(() -> new
        //// UserNotFoundException("User by id " + id + " was not found"));
        // Customer customer =
        //// customerRepo.findCustById(salesInvoiceDtoUpdat.getCustomerId());
        // salesInvoiceData.setCustomerId(customer);
        // salesInvoiceData.setInvoiceNo(salesInvoiceDtoUpdat.getInvoiceNo());
        // salesInvoiceData.setCreatedDate(salesInvoiceDtoUpdat.getCreatedDate());
        // salesInvoiceData.setPaymentType(salesInvoiceDtoUpdat.getPaymentType());
        // salesInvoiceData.setTotalPrice(salesInvoiceDtoUpdat.getTotalPrice());
        // salesInvoiceData.setTotalTax(salesInvoiceDtoUpdat.getTotalTax());
        // salesInvoiceData.setNetTotalPrice(salesInvoiceDtoUpdat.getNetTotalPrice());
        // salesInvoiceRepo.save(salesInvoiceData);
        // // populate SalesInvoceDetail
        // System.out.println("sise is updat tttttttttt " +
        //// salesInvoiceDtoUpdat.getListOfsalesInvoceDetail().size());
        // if(!Objects.isNull(salesInvoiceDtoUpdat.getListOfsalesInvoceDetail())) {
        // salesInvoiceDtoUpdat.getListOfsalesInvoceDetail().forEach(salesInvoiceDetail
        //// -> {
        // SalesInvoceDetail salesInvoceDetail =
        //// salesInvoiceDetailRepo.findSaleceInvoiceDetalDataById(salesInvoiceDetail.getId());
        //// SalesInvoceDetail salesInvoceDetail =
        //// salesInvoiceDetailRepo.findById(salesInvoiceDetail.getId()).orElseThrow(()
        //// -> new UserNotFoundException("User by id was not found"));
        // salesInvoceDetail.setSalesInvoiceId(salesInvoiceData);
        // salesInvoceDetail.setItemServiceName(salesInvoiceDetail.getItemServiceName());
        // salesInvoceDetail.setItemServiceId(salesInvoiceDetail.getItemServiceId());
        // salesInvoceDetail.setUom(salesInvoiceDetail.getUom());
        // salesInvoceDetail.setCode(salesInvoiceDetail.getCode());
        // salesInvoceDetail.setQuantity(salesInvoiceDetail.getQuantity());
        // salesInvoceDetail.setTax(salesInvoiceDetail.getTax());
        // salesInvoceDetail.setSellingUnitPrice(salesInvoiceDetail.getSellingUnitPrice());
        // salesInvoceDetail.setTaxTotal(salesInvoiceDetail.getTaxTotal());
        // salesInvoceDetail.setTotal(salesInvoiceDetail.getTotal());
        // salesInvoiceDetailRepo.save(salesInvoceDetail);
        // });
        // }
        return salesInvoiceData;
    }

    @Transactional
    public SalesInvoice addSalesInvoice(SalesInvoiceRequestDTO salesInvoiceDto) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        SalesInvoice salesInvoice = new SalesInvoice();
        salesInvoice.setInvoiceNo(salesInvoiceDto.getInvoiceNo());
        Customer customer = customerRepo.findCustById(salesInvoiceDto.getCustomerId());
        salesInvoice.setCustomerId(customer);
        salesInvoice.setCreatedDate(salesInvoiceDto.getCreatedDate());
        salesInvoice.setPaymentType(salesInvoiceDto.getPaymentType());
        salesInvoice.setTotalPrice(salesInvoiceDto.getTotalPrice());
        salesInvoice.setTotalTax(salesInvoiceDto.getTotalTax());
        salesInvoice.setNetTotalPrice(salesInvoiceDto.getNetTotalPrice());
        salesInvoice.setCreatedDate(formatter.format(new Date()));

        salesInvoiceRepo.save(salesInvoice);

        List<SalesInvoceDetail> newDetails = new ArrayList<>();
        for (SalesInvoceDetail detailDTO : salesInvoiceDto.getListOfsalesInvoceDetail()) {
            int count = itemServiceRepo
                    .updateItemQuantityByCode(detailDTO.getCode(), detailDTO.getQuantity());
            if (count > 0) {
                SalesInvoceDetail detail = new SalesInvoceDetail();
                detail.setSalesInvoiceId(salesInvoice);
                detail.setItemServiceId(detailDTO.getItemServiceId());
                detail.setItemServiceName(detailDTO.getItemServiceName());
                detail.setCode(detailDTO.getCode());
                detail.setUom(detailDTO.getUom());
                detail.setQuantity(detailDTO.getQuantity());
                detail.setTax(detailDTO.getTax());
                detail.setSellingUnitPrice(detailDTO.getSellingUnitPrice());
                detail.setTaxTotal(detailDTO.getTaxTotal());
                detail.setTotal(detailDTO.getTotal());
                newDetails.add(detail);
            }
        }
        salesInvoiceDetailRepo.saveAll(newDetails);

        ///////////////////////////

        // populate SalesInvoceDetail
        // System.out.println("sise is " +
        // salesInvoiceDto.getListOfsalesInvoceDetail().size());
        // if(!Objects.isNull(salesInvoiceDto.getListOfsalesInvoceDetail())) {
        // salesInvoiceDto.getListOfsalesInvoceDetail().forEach(salesInvoiceDetail -> {
        // SalesInvoceDetail salesInvoceDetail = new SalesInvoceDetail();
        // salesInvoceDetail.setSalesInvoiceId(salesInvoice);
        //// ItemService itemService =
        // itemServiceRepo.findItemServiceDataById(salesInvoiceDetailDTO.getItemServiceIdd());
        //
        //// ItemService itemService = itemServiceRepo.findItemServiceDataById(4());
        //
        // salesInvoceDetail.setItemServiceId(salesInvoiceDetail.getItemServiceId());
        // salesInvoceDetail.setItemServiceName(salesInvoiceDetail.getItemServiceName());
        // salesInvoceDetail.setCode(salesInvoiceDetail.getCode());
        // salesInvoceDetail.setUom(salesInvoiceDetail.getUom());
        // salesInvoceDetail.setQuantity(salesInvoiceDetail.getQuantity());
        // salesInvoceDetail.setTax(salesInvoiceDetail.getTax());
        // salesInvoceDetail.setSellingUnitPrice(salesInvoiceDetail.getSellingUnitPrice());
        // salesInvoceDetail.setTaxTotal(salesInvoiceDetail.getTaxTotal());
        // salesInvoceDetail.setTotal(salesInvoiceDetail.getTotal());
        // salesInvoiceDetailRepo.save(salesInvoceDetail);
        // });
        // }
        return salesInvoice;
    }

    public List<SalesInvoice> findAllSalesInvoice() {

        return salesInvoiceRepo.findAll();
    }

    public SalesInvoice updateSalesInvoic(SalesInvoice salesInvoice) {

        return salesInvoiceRepo.save(salesInvoice);
    }

    public SalesInvoice findSalesInvoiceById(Integer id) {
        System.out.println("invoiceNo 22222222 ################ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ##");
        System.out.println("Id #########################ZZZZZZZZZZZZZZZZZ##" + id);
        return salesInvoiceRepo.findSalesInvoiceById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteSalesInvoiceById(Integer id) {

        salesInvoiceRepo.deleteSalesInvoiceById(id);
    }

    public void deleteItemServiceInvoiceNo(String invoiceNo) {
        salesInvoiceRepo.deleteSalesInvoiceByInvoiceNo(invoiceNo);
    }

    public List<SalesInvoceDetail> findSalesInvoiceDetailDataBySalesInvoiceId(Integer id) {
        return salesInvoiceDetailRepo.findBySalesInvoiceIddd(id);
    }

    public SalesInvoice findByInvoiceNo(String invoiceNo) {

        return salesInvoiceRepo.findBySalesInvoiceNo(invoiceNo);
    }

    public List<SalesInvoceDetail> findSalesInvoiceDetailDataBySalesInvoiceNo(String invoiceNo) {
        return salesInvoiceDetailRepo.findSaleceInvoiceDetalDataByInvoiceNo(invoiceNo);
    }

    public String generateInvoiceNo() {
        SalesInvoice lastInvoice = salesInvoiceRepo.findTopByOrderByIdDesc();
        int lastNumber = 0;
        if (lastInvoice != null) {
            String lastInvoiceNumber = lastInvoice.getInvoiceNo();
            lastNumber = Integer.parseInt(lastInvoiceNumber.substring(6)); // Assuming format: INV-XXXX
        }

        int newNumber = lastNumber + 1;
        String newInvoiceNumber = String.format("INV-%06d", newNumber);

        // Invoice newInvoice = new Invoice();
        // newInvoice.setInvoiceNumber(newInvoiceNumber);

        return newInvoiceNumber;
    }

    public Long getTotalCreditSellingPrice() {
        return salesInvoiceRepo.getTotalCreditSellingPrice();
    }

    public Long getTotalCashSellingPrice() {
        return salesInvoiceRepo.getTotalCashSellingPrice();
    }
}
