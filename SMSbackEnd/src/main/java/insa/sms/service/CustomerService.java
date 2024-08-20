package insa.sms.service;


import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Customer;
import insa.sms.model.ItemService;
import insa.sms.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    private final CustomerRepo customerRepo;

    @Autowired
    public CustomerService(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    public Customer addCustomer(Customer customer) {
        return customerRepo.save(customer);
    }

    public List<Customer> findAllCustomers() {
        return customerRepo.findAll();
    }

    public Customer updateCustomer(Customer customer) {
        return customerRepo.save(customer);
    }
    public Customer findCustById(Integer id) {
        return customerRepo.findCustById(id);
    }
    public Customer findCustomerById(Integer id) {
        return customerRepo.findCustomerById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteCustomer(Integer id){
        customerRepo.deleteCustomerById(id);
    }

    public Customer findByCustomerName(String customerName) {

        return customerRepo.findByCustomerName(customerName);
    }
//    public Customer findByCustomer(Customer customer) {
//
//        return customerRepo.findByCustomer(customer);
//    }
public Long getCustomerCount() {
    return customerRepo.count();
}
    public Long getCustomerCount2() {
        return customerRepo.countCoustomers();
    }

}
