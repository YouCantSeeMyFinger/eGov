package kr.board.controller;

import java.io.File;
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

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

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

	// 회원정보수정
	@RequestMapping("/memberUpdateForm")
	public String memberUpdateForm() {
		log.info("회원정보수정");
		return "member/updateForm";
	}

	@PostMapping("/memberUpdate.do")
	public String memberUpdate(RedirectAttributes rttr, Member member, String memberPassword) {

		// 실패 로직
		if (member.getMemberPassword().equals("") || member.getMemberPassword() == null) {
			log.info("member : {}", member);
			rttr.addFlashAttribute("msgType", "입력하신 비밀번호는 사용할 수 없습니다.");
			rttr.addFlashAttribute("msg", "비밀번호를 입력해주세요.");
			return "redirect:/memberUpdateForm";
		}

		// 성공 로직
		this.memberMapper.memberUpdate(member);
		return "redirect:/";
	}

	@GetMapping("/memberImageForm.do")
	public String memberImageForm() {
		return "member/memberImageForm";
	}

	@PostMapping("/memberImageUpdate.do")
	public String memberImageUpdate(HttpServletRequest request, RedirectAttributes rttr, HttpSession session) {

		// cos
		MultipartRequest multi = null;
		int fileMaxSize = 10 * 1024 * 1024;
		String fileSavePath = request.getRealPath("resources/upload");

		// 파일 의 경로가 잘못된 경우 , 파일이 10MB를 초과하는 경우 예외 발생
		try {
			multi = new MultipartRequest(request, fileSavePath, fileMaxSize, "UTF-8", new DefaultFileRenamePolicy());
		} catch (Exception e) {
			e.printStackTrace();
			rttr.addFlashAttribute("msgType", "파일 업로드 실패");
			rttr.addFlashAttribute("msg", "파일의 용량은 10MB까지만 가능합니다.");
			return "redirect:/memberImageForm.do";
		}

		String memberId = multi.getParameter("memberId");
		String newProfile = "";
		File file = multi.getFile("memberProfile");

		if (file != null) {
			String ext = file.getName().substring(file.getName().lastIndexOf(".") + 1);
			ext = ext.toUpperCase();

			if (ext.equals("PNG") || ext.equals("GIF") || ext.equals("JPG")) {
				String oldProfile = this.memberMapper.getMember(memberId).getMemberProfile();
				File oldFile = new File(fileSavePath + "/" + oldProfile);
				if (oldFile.exists()) {
					oldFile.delete();
				}
				// 로그 결과 파일 확장자 까지 가져온다.
				newProfile = file.getName();
			} else {
				// 이미지 파일이 아닌 경우
				if (file.exists()) {
					file.delete();
				}
				rttr.addFlashAttribute("msgType", "파일 업로드 실패");
				rttr.addFlashAttribute("msg", "이미지 파일만 업로드 가능합니다.");
				return "redirect:/memberImageForm.do";
			}
		}

		Member member = new Member();
		member.setMemberId(memberId);
		member.setMemberProfile(newProfile);
		this.memberMapper.imageUpdate(member);

		// 업데이트 된 정보를 가져와서 다시 세션 생성
		Member updatedMember = this.memberMapper.getMember(memberId);
		session.setAttribute("member", updatedMember);

		rttr.addFlashAttribute("msgType", "파일 업로드 성공");
		rttr.addFlashAttribute("msg", "파일 업로드가 정상적으로 수행되었습니다.");
		return "redirect:/";
	}

}
