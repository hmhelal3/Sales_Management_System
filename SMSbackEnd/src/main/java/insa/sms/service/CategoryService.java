package insa.sms.service;

import insa.sms.exception.UserNotFoundException;
import insa.sms.model.Category;
import insa.sms.repo.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryService {

    private final CategoryRepo categoryRepo;

    @Autowired
    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    public List<Category> findAllCategorys() {
        return categoryRepo.findAll();
    }

    public Category updateCategory(Category Category) {
        return categoryRepo.save(Category);
    }
    public Category findCatById(Integer id) {
        return categoryRepo.findCatById(id);
    }
    public Category findCategoryById(Integer id) {
        return categoryRepo.findCategoryById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteCategory(Integer id){
        categoryRepo.deleteCategoryById(id);
    }
}
