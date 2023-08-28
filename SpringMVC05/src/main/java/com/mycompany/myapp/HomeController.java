package com.mycompany.myapp;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;

import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model) throws Exception {
		// JSONParser 객체 생성
		JSONParser parser = new JSONParser();
		
		// 파일 경로가 잘못된 경우
		// 파일이 존재하지 않을 경우
		Reader reader = new FileReader("");

		return "home";
	}

}
