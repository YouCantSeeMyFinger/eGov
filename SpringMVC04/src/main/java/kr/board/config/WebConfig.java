package kr.board.config;

import javax.servlet.Filter;
import javax.servlet.ServletConfig;

import org.springframework.web.filter.CharacterEncodingFilter;

// WEB.XML를 대체할 JAVA Class 

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

// EncodingConfig
	@Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
		encodingFilter.setEncoding("UTF-8");
		// UTF-8 Encoding을 따르도록 강제설정
		encodingFilter.setForceEncoding(true);
		return new Filter[] { encodingFilter };
	}

//	RootConfig
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { RootConfig.class };
	}

// ServletConfig
	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { ServletConfig.class };
	}

// ServletMapping
	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

}
