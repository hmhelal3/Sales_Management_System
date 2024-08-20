package insa.sms.resource;

import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Customer;
import insa.sms.model.ItemService;
import insa.sms.repo.CustomerRepo;
import insa.sms.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customer")
public class CustomerResource {
    @Autowired
    private final CustomerRepo customerRepo;
    private final CustomerService customerService;


       public CustomerResource(CustomerRepo customerRepo, CustomerService customerService) {
           this.customerRepo = customerRepo;
           this.customerService = customerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers () {
        List<Customer> customers = customerService.findAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Customer> getCustomerById (@PathVariable("id") Integer id) {
        Customer customer = customerService.findCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer newCustomer = customerService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer) {
        Customer updateCustomer = customerService.updateCustomer(customer);
        return new ResponseEntity<>(updateCustomer, HttpStatus.OK);
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteCustomer(@PathVariable("id") Integer id) {
//        customerService.deleteCustomer(id);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    /////Delete by id
    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Map<String, Boolean>> deleteCustomerDataById(@PathVariable Integer id) {
        Customer customer = customerRepo.findById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
        customerRepo.delete(customer);
        Map<String , Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return  ResponseEntity.ok(response);
    }
    @GetMapping("/findByName/{customerName}")
    public Customer getCustomerName(@PathVariable String customerName) {
        return customerRepo.findByCustomerName(customerName);
    }
//    @GetMapping("/findByCustomer/{customer}")
//    public Customer getCustomer(@PathVariable Customer customer) {
//        return customerRepo.findByCustomer(customer);
//    }



    @GetMapping("/count")
    public  Long getCustomerCount() {
        System.out.println("Count ##################################### " );

        System.out.println("Count ##################################### "+customerService.getCustomerCount2() );

        System.out.println("Count ##################################### "+customerService.getCustomerCount2() );
           return customerService.getCustomerCount2();
    }
}
