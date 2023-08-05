package kr.board.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.board.user.Member;
import kr.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// #TODO RESTfull로 변환할것

@Slf4j
@Controller
@RequiredArgsConstructor
public class MemberController {

	private final MemberMapper memberMapper;

	/**
	 * Main View
	 * 
	 * @return
	 */

	@RequestMapping("/memJoin.do")
	public String memJoin() {
		return "member/join";
	}

	/**
	 * Duplicated member check
	 * 
	 * @param memberId
	 * @return
	 */

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

	@SuppressWarnings("unlikely-arg-type")
	@PostMapping("/memberRegister.do")
	public String memRegister(Member member, RedirectAttributes redirectAttribute, HttpSession session,
			HttpServletRequest request) {

		log.info("member : {}", member);

		// 빈칸에 정보를 입력하지 않았을 경우
		if (member.getMemberId() == null || member.getMemberId().equals("") || member.getMemberAge() == null
				|| member.getMemberAge().equals("") || member.getMemberEmail() == null
				|| member.getMemberEmail().equals("") || member.getMemberGender() == null
				|| member.getMemberGender().equals("") || member.getMemberName() == null
				|| member.getMemberName().equals("")) {
			redirectAttribute.addFlashAttribute("msgType", "실패 메시지");
			redirectAttribute.addFlashAttribute("msg", "회원가입시 빈 칸을 모두 채워주세요.");
			return "redirect:/memJoin.do";
		}

		// 두 비밀번호의 값이 다른 경우
		if (!request.getParameter("inputPwd").equals(request.getParameter("inputPwd2"))) {
			redirectAttribute.addFlashAttribute("msgType", "실패 메시지");
			redirectAttribute.addFlashAttribute("msg", "비밀번호가 일치하지 않습니다.");
			return "redirect:/memJoin.do";
		}

		member.setMemberProfile("");

		int result = this.memberMapper.registerMember(member);

		if (result == 1) {
			redirectAttribute.addFlashAttribute("msgType", "성공 메시지");
			redirectAttribute.addFlashAttribute("msg", "회원가입 완료되었습니다.");

			// 회원가입 완료 시 로그인 되도록 하기 위해 세션을 생성
			session.setAttribute("member", member);
			return "redirect:/";
		} else {
			redirectAttribute.addFlashAttribute("msgType", "실패 메시지");
			redirectAttribute.addFlashAttribute("msg", "회원가입 실패하였습니다.");
			return "redirect:/memJoin.do";
		}

	}

	/**
	 * 로그아웃 처리
	 * 
	 * @return
	 */
	@RequestMapping("/memberLogout.do")
	public String memberLogout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

	@RequestMapping("/memberLoginForm.do")
	public String memberLoginForm() {
		log.info("memberLoginForm.do :: Invoked");
		return "member/memberLoginForm";
	}

	@RequestMapping("/memberLogin.do")
	public String memberLogin(HttpSession session, RedirectAttributes redirect, Member member) {

		// NullPointException 주의
		Optional<Member> mvo = Optional.ofNullable((this.memberMapper.memberLogin(member)));

		// 로그인 로직
		if (mvo.isPresent()) {
			session.setAttribute("member", mvo.get());
			// 세션 만료 일정 추가
			// 쿠키와 세션의 차이 
			// 쿠키의 경우 클라이언트 측에서 만료기간을 따로 저장하지 않는 이상 파일로 저장되기 때문에 보안에 취약
			// 하지만 세션의 경우 만료시간을 정하지 않는 경우 홈페이지를 닫는 경우 자동 만료
			session.setMaxInactiveInterval(1800);
			return "redirect:/";
		} else {
			redirect.addFlashAttribute("msgType", "로그인 오류");
			redirect.addFlashAttribute("msg", "비밀번호 및 아이디를 확인해주세요.");
			return "redirect:/memberLoginForm.do";
		}

	}

	// 회원정보수정 컨트롤러

	@RequestMapping("/memberUpdate.do")
	public String memberUdpateForm(HttpSession session, @ModelAttribute Member member) {
		log.info("member");
		return "member/updateForm";
	}

}
