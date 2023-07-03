package kr.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.board.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;

@Controller
public class BoardController {

	@RequestMapping("/")
	public String main() {
		return "home";
	}
}
