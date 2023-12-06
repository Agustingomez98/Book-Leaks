package com.noCountry.library.repository;

import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.enums.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {

    Page<Book> findByGenre(Genre genre, Pageable pageable);

    Page<Book> findByTitleContaining(String partialTitle, Pageable pageable);




    Optional<List<Book>> findTop5ByOrderBySalesAmountAsc();

    Optional<List<Book>> findTop5ByOrderByRatingAsc();




}
