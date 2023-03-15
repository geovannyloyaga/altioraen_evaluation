package com.altioraen.backend.apirest.interfaces;

import com.altioraen.backend.apirest.dto.ResponseDto;
import com.altioraen.backend.apirest.dto.ResponseListDto;
import com.altioraen.backend.apirest.entities.Article;

public interface IArticleService {

	public ResponseDto<Article> save(Article article);
	
	public ResponseDto<Article> update(Article article);
	
	public ResponseListDto<Article> getArticleList();
}
