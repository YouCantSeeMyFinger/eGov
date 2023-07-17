package kr.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.board.user.Member;
import kr.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
public class MemberController {

	private final MemberMapper memberMapper;

	@RequestMapping("/memJoin.do")
	public String memJoin() {
		return "member/join";
	}

	@GetMapping("/memberRegisterCheck.do")
	@ResponseBody
	public int memberRegisterCheck(@RequestParam("memberId") String memberId) {
		Member member = this.memberMapper.registerCheck(memberId);
		if (memberId.equals("") || member != null) {
			// 중복된 아이디가 있으면 0을 반환
			return 0;
		}
		// 가입가능한 아이디면 1을 반환
		return 1;
	}
}
