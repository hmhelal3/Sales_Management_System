package insa.sms.repo;

import insa.sms.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Integer> {


    void deleteCategoryById(Integer id);
    Category  findCatById(Integer id);

    Optional<Category> findCategoryById(Integer id);
}
