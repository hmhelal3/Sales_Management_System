package insa.sms.repo;

import insa.sms.model.Customer;
import insa.sms.model.ItemService;
import insa.sms.model.SalesInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepo  extends JpaRepository<Customer, Integer> {


    void deleteCustomerById(Integer id);
   Customer  findCustById(Integer id);

    Optional<Customer>  findCustomerById(Integer id);
    Customer findByCustomerName(String cnustomerName);
//    Customer findByCustomer(Customer customer);


    @Query("SELECT COUNT(c) FROM Customer c")
    Long countCoustomers();

}
