package com.altioraen.backend.apirest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.altioraen.backend.apirest.dto.ResponseDto;
import com.altioraen.backend.apirest.dto.ResponseListDto;
import com.altioraen.backend.apirest.entities.Article;
import com.altioraen.backend.apirest.interfaces.IArticleService;

@RestController
@RequestMapping("/api/articles")
public class ArticleRestController {

	@Autowired
	private IArticleService articleService;
	
	public void setArticleService(IArticleService articleService) {
		this.articleService = articleService;
	}

	@GetMapping("/getArticleList")
	public ResponseListDto<Article> findAll(){
		try {
			ResponseListDto<Article> articlesFound = this.articleService.getArticleList();
			return articlesFound;
		} catch (Exception e) {
			return new ResponseListDto<Article>(409, "Error para obtener lista de artículos", null, 0);
		}
	}

	@PostMapping("/save")
	public ResponseDto<Article> save(@RequestBody Article requestArticle){
		try {
			ResponseDto<Article> articleCreated = this.articleService.save(requestArticle);
			return articleCreated;
		} catch (Exception e) {
			return new ResponseDto<Article>(409, "Error al crear la artículo", null);
		}
	}
	
	@PostMapping("/update")
	public ResponseDto<Article> update(@RequestBody Article requestArticle){
		try {
			ResponseDto<Article> articleCreated = this.articleService.update(requestArticle);
			return articleCreated;
		} catch (Exception e) {
			return new ResponseDto<Article>(409, "Error al actualizar la artículo", null);
		}
	}
}
