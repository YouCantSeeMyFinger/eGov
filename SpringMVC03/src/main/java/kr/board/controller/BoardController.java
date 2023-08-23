package kr.board.controller;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BoardController {

	@ResponseBody
	@GetMapping("/getSession.do")
	public String getSession(HttpSession session) {
		Optional<Object> memberSession = Optional.ofNullable(session.getAttribute("member"));
		return "{\"member\" : \"" + memberSession.orElse("empty") + "\"}";
	}

	@RequestMapping("/boardMain.do")
	public String main() {
		return "board/board";
	}

}
