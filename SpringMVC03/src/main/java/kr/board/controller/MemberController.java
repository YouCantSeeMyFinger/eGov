package kr.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MemberController {

	@RequestMapping("/memJoin.do")
	public String memJoin() {
		return "member/join";
	}

	@GetMapping("/memberRegisterCheck.do")
	@ResponseBody
	public String member1(@RequestParam("memberId") String memberId) {
		log.info("아이디 : {} ", memberId);
		memberId = memberId + "ddd";
		return memberId;
	}
}
