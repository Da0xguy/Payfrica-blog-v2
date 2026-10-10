import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  FileText,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Plus,
  Search,
  Send,
  Trash2,
  Upload,
} from "lucide-react";
import {
  API_BASE_URL,
  authorsApi,
  authApi,
  categoriesApi,
  postsApi,
  uploadsApi,
} from "../api";

interface CmsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string | { name: string };
  date: string;
  readTime: string;
  coverImage?: string;
  image?: string;
  tags?: string[];
  isPublished?: boolean;
}

interface CmsCategory {
  slug: string;
  name: string;
}

interface CmsAuthor {
  id: string;
  name: string;
}

interface EditorForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string;
}

const emptyForm: EditorForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5",
  coverImage: "",
  tags: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const resolveImageUrl = (url: string) =>
  url.startsWith("http") || url.startsWith("blob:")
    ? url
    : `${API_BASE_URL}${url}`;

const getAuthorName = (author: CmsPost["author"]) =>
  typeof author === "string" ? author : (author?.name ?? "");

export const CmsPage = () => {
  const [token, setToken] = useState(() =>
    sessionStorage.getItem("payfrica-cms-token"),
  );
  const [email, setEmail] = useState(
    () => sessionStorage.getItem("payfrica-cms-email") ?? "",
  );
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginPending, setLoginPending] = useState(false);
  const [posts, setPosts] = useState<CmsPost[]>([]);
  const [authors, setAuthors] = useState<CmsAuthor[]>([]);
  const [categories, setCategories] = useState<CmsCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");
  const [editingPost, setEditingPost] = useState<CmsPost | null>(null);
  const [form, setForm] = useState<EditorForm>(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    if (!token) return;
    let active = true;
    setLoading(true);
    setLoadError("");

    Promise.all([
      postsApi.getAll({ page: 1, limit: 100 }),
      authorsApi.getAll(),
      categoriesApi.getAll(),
    ])
      .then(([postResults, authorResults, categoryResults]) => {
        if (!active) return;
        setPosts(postResults);
        setAuthors(authorResults);
        setCategories(categoryResults);
      })
      .catch(() => {
        if (active)
          setLoadError(
            "Could not load the newsroom. Check that the API is running, then try again.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token]);

  const visiblePosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "published" ? post.isPublished : !post.isPublished);
      const matchesSearch =
        !normalizedSearch ||
        `${post.title} ${post.category} ${getAuthorName(post.author)}`
          .toLowerCase()
          .includes(normalizedSearch);
      return matchesFilter && matchesSearch;
    });
  }, [filter, posts, search]);

  const publishedCount = posts.filter((post) => post.isPublished).length;
  const draftCount = posts.length - publishedCount;

  const resetEditor = () => {
    setEditingPost(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setSlugTouched(false);
    setImagePreview("");
    setFormError("");
  };

  const startNewStory = () => {
    resetEditor();
    setForm((current) => ({
      ...current,
      category: categories[0]?.slug ?? "",
      author: authors[0]?.name ?? "",
    }));
    setNotice("");
  };

  const openPost = (post: CmsPost) => {
    setEditingPost(post);
    setForm({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      category: post.category ?? "",
      author: getAuthorName(post.author),
      date: post.date
        ? new Date(post.date).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      readTime: String(parseInt(post.readTime, 10) || 5),
      coverImage: post.coverImage ?? post.image ?? "",
      tags: post.tags?.join(", ") ?? "",
    });
    setSlugTouched(true);
    setImagePreview(post.coverImage ?? post.image ?? "");
    setFormError("");
    setNotice("");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setLoginPending(true);
    try {
      const result = await authApi.login(email, password);
      if (result.user?.role !== "admin") {
        setLoginError("This account does not have CMS access.");
        return;
      }
      sessionStorage.setItem("payfrica-cms-token", result.access_token);
      sessionStorage.setItem("payfrica-cms-email", result.user.email);
      setEmail(result.user.email);
      setToken(result.access_token);
      setPassword("");
    } catch {
      setLoginError(
        "Sign-in failed. Check your email and password, then try again.",
      );
    } finally {
      setLoginPending(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("payfrica-cms-token");
    sessionStorage.removeItem("payfrica-cms-email");
    setToken(null);
    setPosts([]);
    resetEditor();
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }));
  };

  const handleImageChange = async (file?: File) => {
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    setFormError("");
    try {
      const uploaded = await uploadsApi.uploadImage(file);
      setForm((current) => ({ ...current, coverImage: uploaded.url }));
      setImagePreview(uploaded.url);
    } catch {
      setFormError(
        "Image upload failed. Check the API connection and try another file.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    const publish =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") ===
      "publish";
    setSaving(true);
    setFormError("");
    setNotice("");
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      category: form.category,
      author: form.author,
      date: new Date(`${form.date}T12:00:00`).toISOString(),
      readTime: `${form.readTime} min read`,
      coverImage: form.coverImage,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isPublished: publish,
    };

    try {
      if (editingPost) {
        await postsApi.update(editingPost.id, payload, token);
      } else {
        await postsApi.create(payload, token);
      }
      await reloadPosts();
      resetEditor();
      setNotice(publish ? "Story published." : "Draft saved.");
    } catch {
      setFormError(
        "Could not save this story. Check the fields, image upload, and your admin session.",
      );
    } finally {
      setSaving(false);
    }
  };

  const reloadPosts = async () => {
    const results = await postsApi.getAll({ page: 1, limit: 100 });
    setPosts(results);
  };

  const handlePublishToggle = async (post: CmsPost) => {
    if (!token) return;
    setLoadError("");
    try {
      await postsApi.update(post.id, { isPublished: !post.isPublished }, token);
      await reloadPosts();
      setNotice(
        post.isPublished ? "Story moved to drafts." : "Story published.",
      );
    } catch {
      setLoadError(
        "Could not update this story. Your admin session may have expired.",
      );
    }
  };

  const handleDelete = async (post: CmsPost) => {
    if (
      !token ||
      !window.confirm(`Delete “${post.title}”? This cannot be undone.`)
    )
      return;
    setLoadError("");
    try {
      await postsApi.delete(post.id, token);
      await reloadPosts();
      setNotice("Story deleted.");
    } catch {
      setLoadError(
        "Could not delete this story. Your admin session may have expired.",
      );
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#f1f2ed] px-5 py-12 text-[#18211e] sm:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full max-w-4xl overflow-hidden border border-[#d9ddd5] bg-white md:grid-cols-[1fr_0.9fr]">
            <div className="flex flex-col justify-between bg-[#18211e] p-8 text-white sm:p-12">
              <div className="flex items-center gap-3 text-sm font-semibold tracking-wide">
                <span className="grid h-9 w-9 place-items-center bg-[#e56a4b] font-display text-lg">
                  P
                </span>
                PAYFRICA <span className="text-white/45">/</span> EDITORIAL
              </div>
              <div className="py-16 md:py-24">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#e56a4b]">
                  The newsroom
                </p>
                <h1 className="max-w-sm font-display text-4xl font-semibold leading-tight sm:text-5xl">
                  Good stories move things forward.
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
                  Sign in to shape the next Payfrica story.
                </p>
              </div>
              <p className="text-xs text-white/40">
                PAYFRICA JOURNAL · PRIVATE EDITION
              </p>
            </div>

            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center p-8 sm:p-12"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#78827c]">
                Editor access
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-[#69736d]">
                Use your administrator account to continue.
              </p>
              <label
                className="mt-8 text-xs font-semibold uppercase tracking-wide text-[#48524c]"
                htmlFor="cms-email"
              >
                Email address
              </label>
              <input
                id="cms-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 border border-[#d7dcd5] bg-[#fbfcfa] px-3 text-sm outline-none transition focus:border-[#c84323]"
              />
              <label
                className="mt-5 text-xs font-semibold uppercase tracking-wide text-[#48524c]"
                htmlFor="cms-password"
              >
                Password
              </label>
              <input
                id="cms-password"
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-12 border border-[#d7dcd5] bg-[#fbfcfa] px-3 text-sm outline-none transition focus:border-[#c84323]"
              />
              {loginError && (
                <p role="alert" className="mt-4 text-sm text-[#b23c23]">
                  {loginError}
                </p>
              )}
              <button
                type="submit"
                disabled={loginPending}
                className="mt-7 flex h-12 items-center justify-center gap-2 bg-[#c84323] text-sm font-semibold text-white transition hover:bg-[#ad351d] disabled:cursor-wait disabled:opacity-60"
              >
                {loginPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
                Sign in to CMS
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const isEditing = editingPost !== null;
  const imageSource = imagePreview ? resolveImageUrl(imagePreview) : "";

  return (
    <div className="min-h-screen bg-[#f1f2ed] text-[#18211e]">
      <header className="flex min-h-16 items-center justify-between border-b border-white/10 bg-[#18211e] px-5 text-white sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center bg-[#e56a4b] font-display text-lg font-bold">
            P
          </span>
          <span className="text-sm font-semibold tracking-wide">
            PAYFRICA <span className="text-white/40">/</span> EDITORIAL
          </span>
          <span className="hidden border-l border-white/20 pl-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 sm:inline">
            CMS
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="hidden max-w-48 truncate text-xs text-white/65 sm:inline">
            {email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-white/70 transition hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-360 md:grid-cols-[224px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#dce0d8] bg-[#f7f8f4] p-5 md:block">
          <p className="px-3 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#87918a]">
            Workspace
          </p>
          <button
            onClick={resetEditor}
            className="mt-4 flex w-full items-center gap-3 border-l-2 border-[#c84323] bg-[#e9ece6] px-3 py-3 text-left text-sm font-semibold"
          >
            <FileText className="h-4 w-4 text-[#c84323]" /> Stories
          </button>
          <div className="mt-8 border-t border-[#dce0d8] pt-5">
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#87918a]">
              At a glance
            </p>
            <div className="mt-4 space-y-3 px-3 text-xs text-[#69736d]">
              <div className="flex items-center justify-between">
                <span>Published</span>
                <span className="font-semibold text-[#18211e]">
                  {publishedCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Drafts</span>
                <span className="font-semibold text-[#18211e]">
                  {draftCount}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-[#dce0d8] pt-5">
            <p className="px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#87918a]">
              Publishing
            </p>
            <p className="mt-3 px-3 text-xs leading-5 text-[#69736d]">
              Drafts stay private until you publish them.
            </p>
          </div>
        </aside>

        <main className="min-w-0 px-5 py-7 sm:px-8 sm:py-9 lg:px-11">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#dce0d8] pb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c84323]">
                Payfrica Journal
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                {isEditing ? "Edit story" : "Stories"}
              </h1>
              <p className="mt-2 text-sm text-[#69736d]">
                {isEditing
                  ? "Refine the details, then save or publish."
                  : "Manage drafts and published articles."}
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={startNewStory}
                className="flex h-11 items-center gap-2 bg-[#c84323] px-4 text-sm font-semibold text-white transition hover:bg-[#ad351d]"
              >
                <Plus className="h-4 w-4" /> New story
              </button>
            ) : (
              <button
                onClick={resetEditor}
                className="flex h-10 items-center gap-2 px-2 text-sm font-medium text-[#59635d] transition hover:text-[#18211e]"
              >
                <ArrowLeft className="h-4 w-4" /> Back to stories
              </button>
            )}
          </div>

          {notice && (
            <div
              role="status"
              className="mt-5 flex items-center gap-2 border border-[#bfd3c5] bg-[#e8f1e9] px-4 py-3 text-sm text-[#315f3f]"
            >
              <Check className="h-4 w-4" />
              {notice}
            </div>
          )}
          {loadError && (
            <div
              role="alert"
              className="mt-5 border border-[#e8c5ba] bg-[#fbefeb] px-4 py-3 text-sm text-[#a63b24]"
            >
              {loadError}
            </div>
          )}

          {!isEditing ? (
            <section className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dce0d8] pb-4">
                <div
                  className="flex items-center gap-1"
                  role="tablist"
                  aria-label="Filter stories"
                >
                  {(["all", "published", "drafts"] as const).map((value) => (
                    <button
                      key={value}
                      role="tab"
                      aria-selected={filter === value}
                      onClick={() => setFilter(value)}
                      className={`px-3 py-2 text-xs font-semibold capitalize transition ${filter === value ? "bg-[#18211e] text-white" : "text-[#68726c] hover:bg-[#e5e8e1]"}`}
                    >
                      {value === "all"
                        ? `All stories · ${posts.length}`
                        : value === "published"
                          ? `Published · ${publishedCount}`
                          : `Drafts · ${draftCount}`}
                    </button>
                  ))}
                </div>
                <label className="flex h-10 w-full max-w-xs items-center gap-2 border border-[#d5dad2] bg-white px-3">
                  <Search className="h-4 w-4 text-[#87918a]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Find a story"
                    className="w-full bg-transparent text-xs outline-none placeholder:text-[#9aa29c]"
                  />
                </label>
              </div>

              <div className="divide-y divide-[#dce0d8]">
                {loading ? (
                  <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#69736d]">
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Loading stories
                  </div>
                ) : visiblePosts.length ? (
                  visiblePosts.map((post) => (
                    <article
                      key={post.id}
                      className="flex flex-wrap items-center gap-4 py-5"
                    >
                      <div className="h-18 w-24 shrink-0 overflow-hidden bg-[#e3e6df]">
                        {post.coverImage || post.image ? (
                          <img
                            src={resolveImageUrl(
                              post.coverImage ?? post.image ?? "",
                            )}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="grid h-full place-items-center text-[#a1aaa3]">
                            <ImagePlus className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-45 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${post.isPublished ? "bg-[#3c8b5b]" : "bg-[#c68a37]"}`}
                          />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#758078]">
                            {post.isPublished ? "Published" : "Draft"}
                          </span>
                          <span className="text-[#c4c9c2]">·</span>
                          <span className="text-[10px] uppercase tracking-wide text-[#758078]">
                            {post.category}
                          </span>
                        </div>
                        <h2 className="mt-1 line-clamp-1 font-display text-lg font-semibold">
                          {post.title}
                        </h2>
                        <p className="mt-1 text-xs text-[#77817a]">
                          {getAuthorName(post.author)}{" "}
                          <span className="px-1">·</span> {post.readTime || "—"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openPost(post)}
                          className="px-3 py-2 text-xs font-semibold text-[#39443d] hover:bg-[#e4e8e1]"
                          aria-label={`Edit ${post.title}`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => void handlePublishToggle(post)}
                          className="px-3 py-2 text-xs font-semibold text-[#39443d] hover:bg-[#e4e8e1]"
                        >
                          {post.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => void handleDelete(post)}
                          className="grid h-9 w-9 place-items-center text-[#89928c] hover:bg-[#f8e9e5] hover:text-[#b23c23]"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-16 text-center">
                    <FileText className="mx-auto h-6 w-6 text-[#9aa39c]" />
                    <p className="mt-3 text-sm font-semibold">
                      No stories found
                    </p>
                    <p className="mt-1 text-xs text-[#78827b]">
                      Try another filter or start a new story.
                    </p>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <form
              onSubmit={(event) => void handleSave(event)}
              className="grid gap-8 pt-7 xl:grid-cols-[minmax(0,1fr)_300px]"
            >
              <div className="space-y-6">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                    Story title
                  </span>
                  <input
                    required
                    minLength={5}
                    maxLength={200}
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    placeholder="A clear, compelling headline"
                    className="mt-2 h-12 w-full border border-[#d5dad2] bg-white px-4 font-display text-lg outline-none focus:border-[#c84323]"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                    URL slug
                  </span>
                  <div className="mt-2 flex h-11 items-center border border-[#d5dad2] bg-white px-3">
                    <span className="shrink-0 text-xs text-[#929b94]">
                      /journal/
                    </span>
                    <input
                      required
                      pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                      value={form.slug}
                      onChange={(event) => {
                        setSlugTouched(true);
                        setForm((current) => ({
                          ...current,
                          slug: event.target.value,
                        }));
                      }}
                      className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                    Short summary
                  </span>
                  <textarea
                    required
                    minLength={10}
                    maxLength={500}
                    rows={3}
                    value={form.excerpt}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        excerpt: event.target.value,
                      }))
                    }
                    placeholder="A concise introduction to the story"
                    className="mt-2 w-full resize-y border border-[#d5dad2] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#c84323]"
                  />
                  <span className="mt-1 block text-right text-[10px] text-[#929b94]">
                    {form.excerpt.length}/500
                  </span>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                    Article body
                  </span>
                  <textarea
                    required
                    minLength={50}
                    rows={13}
                    value={form.content}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        content: event.target.value,
                      }))
                    }
                    placeholder="Write the full article here. Separate paragraphs with a blank line."
                    className="mt-2 w-full resize-y border border-[#d5dad2] bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#c84323]"
                  />
                  <span className="mt-1 block text-right text-[10px] text-[#929b94]">
                    {form.content.trim().split(/\s+/).filter(Boolean).length}{" "}
                    words
                  </span>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                      Category
                    </span>
                    <select
                      required
                      value={form.category}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          category: event.target.value,
                        }))
                      }
                      className="mt-2 h-11 w-full border border-[#d5dad2] bg-white px-3 text-sm outline-none focus:border-[#c84323]"
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                      Author
                    </span>
                    <select
                      required
                      value={form.author}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          author: event.target.value,
                        }))
                      }
                      className="mt-2 h-11 w-full border border-[#d5dad2] bg-white px-3 text-sm outline-none focus:border-[#c84323]"
                    >
                      <option value="" disabled>
                        Select author
                      </option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.name}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                      Publish date
                    </span>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          date: event.target.value,
                        }))
                      }
                      className="mt-2 h-11 w-full border border-[#d5dad2] bg-white px-3 text-sm outline-none focus:border-[#c84323]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                      Read time
                    </span>
                    <span className="mt-2 flex h-11 items-center border border-[#d5dad2] bg-white px-3">
                      <input
                        required
                        type="number"
                        min="1"
                        max="90"
                        value={form.readTime}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            readTime: event.target.value,
                          }))
                        }
                        className="w-full text-sm outline-none"
                      />
                      <span className="text-xs text-[#87918a]">min</span>
                    </span>
                  </label>
                  <label className="block sm:col-span-1">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                      Tags
                    </span>
                    <input
                      value={form.tags}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          tags: event.target.value,
                        }))
                      }
                      placeholder="Africa, payments"
                      className="mt-2 h-11 w-full border border-[#d5dad2] bg-white px-3 text-sm outline-none focus:border-[#c84323]"
                    />
                  </label>
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="border border-[#e8c5ba] bg-[#fbefeb] px-4 py-3 text-sm text-[#a63b24]"
                  >
                    {formError}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 border-t border-[#dce0d8] pt-5">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="flex h-11 items-center gap-2 border border-[#c9d0c8] bg-white px-4 text-sm font-semibold transition hover:bg-[#f8faf6] disabled:opacity-50"
                  >
                    {saving ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}{" "}
                    Save draft
                  </button>
                  <button
                    type="submit"
                    value="publish"
                    disabled={saving || uploading}
                    className="flex h-11 items-center gap-2 bg-[#c84323] px-4 text-sm font-semibold text-white transition hover:bg-[#ad351d] disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" /> Publish story
                  </button>
                </div>
              </div>

              <aside className="space-y-5">
                <section className="border border-[#dce0d8] bg-[#f8f9f6] p-4">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-[#536057]">
                    Cover image
                  </h2>
                  {imageSource ? (
                    <div className="relative mt-3 aspect-4/3 overflow-hidden bg-[#e2e6df]">
                      <img
                        src={imageSource}
                        alt="Cover preview"
                        className="h-full w-full object-cover"
                      />
                      {uploading && (
                        <div className="absolute inset-0 grid place-items-center bg-black/35 text-white">
                          <LoaderCircle className="h-6 w-6 animate-spin" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="mt-3 flex aspect-4/3 cursor-pointer flex-col items-center justify-center border border-dashed border-[#bfc8bf] bg-white text-center transition hover:border-[#c84323]">
                      <ImagePlus className="h-6 w-6 text-[#87918a]" />
                      <span className="mt-2 text-xs font-semibold">
                        Choose a cover image
                      </span>
                      <span className="mt-1 text-[10px] text-[#87918a]">
                        JPG, PNG or WebP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) =>
                          void handleImageChange(event.target.files?.[0])
                        }
                      />
                    </label>
                  )}
                  {imageSource && (
                    <label className="mt-3 flex h-10 cursor-pointer items-center justify-center gap-2 border border-[#d5dad2] bg-white text-xs font-semibold text-[#505b53] hover:bg-[#f3f5f1]">
                      <Upload className="h-3.5 w-3.5" /> Replace image
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(event) =>
                          void handleImageChange(event.target.files?.[0])
                        }
                      />
                    </label>
                  )}
                  {form.coverImage && (
                    <p className="mt-2 truncate text-[10px] text-[#87918a]">
                      Image uploaded
                    </p>
                  )}
                </section>
                <section className="border border-[#dce0d8] bg-white p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#c84323]">
                    Preview
                  </p>
                  {imageSource && (
                    <img
                      src={imageSource}
                      alt=""
                      className="mt-3 aspect-video w-full object-cover"
                    />
                  )}
                  <h2 className="mt-3 font-display text-lg font-semibold leading-snug">
                    {form.title || "Your headline will appear here"}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-[#69736d]">
                    {form.excerpt ||
                      "Add a short summary to introduce this story."}
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-wide text-[#87918a]">
                    {form.category || "Category"}{" "}
                    <span className="px-1">·</span> {form.readTime || "5"} min
                    read
                  </p>
                </section>
                {editingPost?.slug && (
                  <a
                    href={`/journal/${editingPost.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-[#536057] hover:text-[#c84323]"
                  >
                    Open published page <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </aside>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
